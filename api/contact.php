<?php
declare(strict_types=1);

/**
 * Réception du formulaire de contact.
 *
 * UN SEUL courriel part, vers la boîte interne. Il n'y a délibérément aucun
 * accusé de réception.
 *
 * Un accusé part par construction vers l'adresse que le visiteur a tapée, et
 * la version précédente y recopiait son message. N'importe qui pouvait donc
 * faire envoyer un texte de son choix à un destinataire de son choix, depuis
 * contact@seriouslabs.tech, authentifié chez OVH et validé par le SPF du
 * domaine. Ce n'est pas une faille du serveur : c'est la réputation du domaine
 * et de la boîte qu'on met en jeu, et une mise en liste noire couperait le
 * courrier de l'entreprise. Le formulaire n'expédie donc plus rien vers
 * l'extérieur, et la confirmation se fait à l'écran.
 */

require __DIR__ . '/lib/smtp.php';

const MAILBOX       = 'contact@seriouslabs.tech';
const SMTP_HOST     = 'ssl0.ovh.net';
const SMTP_PORT     = 465;
const MIN_SECONDS   = 3;     // en deçà, c'est un robot
const MAX_PER_HOUR  = 5;     // par adresse IP
const MAX_PER_HOUR_TOTAL = 20; // toutes adresses confondues
const CONFIG_PATHS  = ['/etc/seriouslabs/smtp.env', __DIR__ . '/../.env'];

/* ------------------------------------------------------------- sortie -- */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function reply(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function fail(string $message, int $status = 400): never
{
    reply($status, ['ok' => false, 'error' => $message]);
}

/* --------------------------------------------------------- vérifications -- */

$lang = (($_POST['lang'] ?? 'fr') === 'en') ? 'en' : 'fr';

/** Messages rendus au visiteur, dans sa langue. */
function say(string $key): string
{
    global $lang;

    static $t = [
        'method'   => ['fr' => 'Méthode non autorisée.',
                       'en' => 'Method not allowed.'],
        'required' => ['fr' => 'Merci de remplir les champs obligatoires.',
                       'en' => 'Please fill in the required fields.'],
        'email'    => ['fr' => 'Cette adresse électronique ne semble pas valide.',
                       'en' => 'That email address does not look valid.'],
        'consent'  => ['fr' => 'Merci de cocher la case de consentement.',
                       'en' => 'Please tick the consent box.'],
        'flood'    => ['fr' => 'Trop de messages envoyés depuis cette connexion. Réessayez dans une heure ou écrivez directement à ' . MAILBOX . '.',
                       'en' => 'Too many messages sent from this connection. Try again in an hour, or write directly to ' . MAILBOX . '.'],
        'unset'    => ['fr' => "Le formulaire n'est pas encore configuré. Écrivez-nous à " . MAILBOX . '.',
                       'en' => 'The form is not configured yet. Please write to us at ' . MAILBOX . '.'],
        'failed'   => ['fr' => "Le message n'a pas pu être envoyé. Écrivez-nous directement à " . MAILBOX . '.',
                       'en' => 'The message could not be sent. Please write directly to ' . MAILBOX . '.'],
    ];

    return $t[$key][$lang] ?? $t[$key]['fr'];
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    fail(say('method'), 405);
}

$field = static function (string $name, int $max = 500): string {
    $raw = $_POST[$name] ?? '';
    if (!is_string($raw)) {
        return '';
    }
    // On retire les caractères de contrôle : ce sont eux qui servent aux
    // injections d'en-têtes, et ils n'ont aucun usage légitime ici.
    $clean = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', trim($raw)) ?? '';
    return mb_substr_compat($clean, $max);
};

// mbstring n'est pas installé : troncature sûre en octets, sans couper un
// caractère UTF-8 en deux.
function mb_substr_compat(string $s, int $maxBytes): string
{
    if (strlen($s) <= $maxBytes) {
        return $s;
    }
    $cut = substr($s, 0, $maxBytes);
    // On recule tant qu'on est sur un octet de continuation UTF-8.
    while ($cut !== '' && (ord($cut[strlen($cut) - 1]) & 0xC0) === 0x80) {
        $cut = substr($cut, 0, -1);
    }
    return $cut === '' ? '' : substr($cut, 0, -1);
}

// Piège à robots : ce champ est hors écran, un humain ne le voit jamais.
if (($_POST['site_web'] ?? '') !== '') {
    // On répond « ok » exprès : un robot qui reçoit une erreur réessaie.
    reply(200, ['ok' => true]);
}

// Le champ d'horodatage est POSÉ PAR LE NAVIGATEUR. Son absence n'est donc
// pas un cas limite à tolérer : c'est la signature d'un client qui n'a pas
// exécuté la page. L'ancienne rédaction ne testait le délai que si le champ
// était présent, ce qui suffisait à contourner tout le contrôle en l'omettant.
$ts = (int) ($_POST['ts'] ?? 0);
if ($ts <= 0 || (microtime(true) * 1000 - $ts) < MIN_SECONDS * 1000) {
    reply(200, ['ok' => true]);
}

// Un navigateur parlant à un serveur HTTP/2 n'émet jamais de HTTP/1.0. Les deux
// robots reçus le faisaient, tout en annonçant Chrome dans leur signature.
if (($_SERVER['SERVER_PROTOCOL'] ?? '') === 'HTTP/1.0') {
    reply(200, ['ok' => true]);
}

$nom      = $field('nom', 120);
$societe  = $field('societe', 160);
$email    = $field('email', 200);
$tel      = $field('telephone', 40);
$secteur  = $field('secteur', 80);
$effectif = $field('effectif', 10);
$message  = $field('message', 4000);

if ($nom === '' || $societe === '' || $email === '' || $message === '') {
    fail(say('required'));
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail(say('email'));
}

if (($_POST['consentement'] ?? '') === '') {
    fail(say('consent'));
}

/* ------------------------------------------------- limitation par adresse -- */

$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');

$stateDir = is_dir('/var/lib/seriouslabs') && is_writable('/var/lib/seriouslabs')
    ? '/var/lib/seriouslabs'
    : sys_get_temp_dir();

$bucket = $stateDir . '/rl-' . hash('sha256', $ip) . '.json';
$now    = time();
$hits   = [];

if (is_file($bucket)) {
    $decoded = json_decode((string) @file_get_contents($bucket), true);
    if (is_array($decoded)) {
        $hits = array_values(array_filter(
            $decoded,
            static fn($t): bool => is_int($t) && $t > $now - 3600
        ));
    }
}

if (count($hits) >= MAX_PER_HOUR) {
    fail(say('flood'), 429);
}

$hits[] = $now;
@file_put_contents($bucket, json_encode($hits), LOCK_EX);

// Plafond global. Le plafond par adresse ne vaut rien contre un robot qui
// change d'IP à chaque envoi, ce que les deux premiers reçus faisaient.
$global = $stateDir . '/rl-global.json';
$tous = [];
if (is_file($global)) {
    $d = json_decode((string) @file_get_contents($global), true);
    if (is_array($d)) {
        $tous = array_values(array_filter($d, static fn($t): bool => is_int($t) && $t > $now - 3600));
    }
}
if (count($tous) >= MAX_PER_HOUR_TOTAL) {
    error_log('[seriouslabs] plafond horaire global atteint');
    fail(say('flood'), 429);
}
$tous[] = $now;
@file_put_contents($global, json_encode($tous), LOCK_EX);

/* ------------------------------------------------------------- réglages -- */

$config = [];
foreach (CONFIG_PATHS as $path) {
    if (is_readable($path)) {
        $parsed = parse_ini_file($path, false, INI_SCANNER_RAW);
        if (is_array($parsed)) {
            $config = $parsed;
            break;
        }
    }
}

$smtpUser = (string) ($config['SMTP_USER'] ?? MAILBOX);
$smtpPass = (string) ($config['SMTP_PASS'] ?? '');

if ($smtpPass === '') {
    error_log('[seriouslabs] SMTP_PASS absent : voir /etc/seriouslabs/smtp.env');
    fail(say('unset'), 503);
}

/* -------------------------------------------------------------- courriels -- */

$recu = date('d/m/Y à H:i');

$interne = <<<TXT
Nouvelle demande depuis seriouslabs.tech

Nom        : {$nom}
Structure  : {$societe}
Courriel   : {$email}
Téléphone  : {$tel}
Effectif   : {$effectif}
Secteur    : {$secteur}

Besoin exprimé
--------------
{$message}

--
Reçu le {$recu} — IP {$ip}
TXT;

try {
    $smtp = new Smtp(SMTP_HOST, SMTP_PORT, $smtpUser, $smtpPass);

    // La demande d'abord : c'est elle qui ne doit jamais se perdre.
    $smtp->send(
        from:    [MAILBOX, 'Formulaire seriouslabs.tech'],
        to:      [MAILBOX, 'Serious Labs'],
        subject: ($lang === 'en' ? 'Enquiry — ' : 'Demande — ') . $societe . ' (' . $nom . ')',
        body:    $interne,
        replyTo: [$email, $nom]
    );
} catch (Throwable $e) {
    error_log('[seriouslabs] envoi interne impossible : ' . $e->getMessage());
    fail(say('failed'), 502);
}

reply(200, ['ok' => true]);
