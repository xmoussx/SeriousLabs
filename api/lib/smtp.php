<?php
declare(strict_types=1);

/**
 * Client SMTP minimal, sur mesure.
 *
 * Il n'existe pas de composer sur cette machine et un formulaire de contact ne
 * justifie pas d'en installer un. Ce fichier fait exactement ce qu'il faut :
 * une connexion TLS implicite, une authentification, un message. Rien d'autre.
 *
 * On n'utilise volontairement pas mail() : un message parti d'une IP de VPS
 * sans authentification est classé indésirable par la plupart des serveurs.
 * En s'authentifiant sur la boîte OVH, le courriel sort par l'infrastructure
 * OVH, qui est ce que le SPF du domaine autorise.
 */
final class SmtpException extends RuntimeException {}

final class Smtp
{
    /** @var resource|null */
    private $sock = null;

    public function __construct(
        private string $host,
        private int $port,
        private string $user,
        private string $pass,
        private int $timeout = 20
    ) {}

    public function __destruct()
    {
        $this->close();
    }

    /* ------------------------------------------------------------ public -- */

    /**
     * @param array{0:string,1:string} $from    [adresse, nom affiché]
     * @param array{0:string,1:string} $to      [adresse, nom affiché]
     * @param array{0:string,1:string}|null $replyTo
     * @param array<string,string> $extraHeaders
     */
    public function send(
        array $from,
        array $to,
        string $subject,
        string $body,
        ?array $replyTo = null,
        array $extraHeaders = []
    ): void {
        $this->connect();

        $this->cmd('MAIL FROM:<' . $from[0] . '>', [250]);
        $this->cmd('RCPT TO:<' . $to[0] . '>', [250, 251]);
        $this->cmd('DATA', [354]);

        $headers = [
            'Date'                      => date('r'),
            'From'                      => self::mailbox($from),
            'To'                        => self::mailbox($to),
            'Subject'                   => self::encodeHeader($subject),
            'Message-ID'                => '<' . bin2hex(random_bytes(16)) . '@' . $this->domainOf($from[0]) . '>',
            'MIME-Version'              => '1.0',
            'Content-Type'              => 'text/plain; charset=UTF-8',
            'Content-Transfer-Encoding' => 'base64',
        ];

        if ($replyTo !== null) {
            $headers['Reply-To'] = self::mailbox($replyTo);
        }
        foreach ($extraHeaders as $k => $v) {
            $headers[$k] = self::encodeHeader($v);
        }

        $raw = '';
        foreach ($headers as $name => $value) {
            $raw .= $name . ': ' . $value . "\r\n";
        }
        $raw .= "\r\n" . chunk_split(base64_encode($body), 76, "\r\n");

        $this->write(self::stuffDots($raw) . "\r\n.\r\n");
        $this->expect([250]);

        $this->quit();
    }

    /* ----------------------------------------------------------- interne -- */

    private function connect(): void
    {
        if ($this->sock !== null) {
            return;
        }

        $ctx = stream_context_create([
            'ssl' => [
                'verify_peer'       => true,
                'verify_peer_name'  => true,
                'SNI_enabled'       => true,
                'crypto_method'     => STREAM_CRYPTO_METHOD_TLS_CLIENT,
            ],
        ]);

        $errNo = 0;
        $errStr = '';
        $sock = @stream_socket_client(
            'ssl://' . $this->host . ':' . $this->port,
            $errNo,
            $errStr,
            $this->timeout,
            STREAM_CLIENT_CONNECT,
            $ctx
        );

        if ($sock === false) {
            throw new SmtpException(sprintf('Connexion à %s:%d impossible (%d %s)', $this->host, $this->port, $errNo, $errStr));
        }

        $this->sock = $sock;
        stream_set_timeout($this->sock, $this->timeout);

        $this->expect([220]);
        $this->cmd('EHLO ' . $this->heloName(), [250]);

        // AUTH LOGIN : l'identifiant et le mot de passe partent en base64, sur
        // un canal déjà chiffré par TLS implicite (port 465).
        $this->cmd('AUTH LOGIN', [334]);
        $this->cmd(base64_encode($this->user), [334]);
        $this->cmd(base64_encode($this->pass), [235]);
    }

    private function quit(): void
    {
        try {
            $this->cmd('QUIT', [221]);
        } catch (SmtpException) {
            // Un serveur qui raccroche sans répondre au QUIT n'invalide pas
            // un message déjà accepté en 250. On ignore.
        }
        $this->close();
    }

    private function close(): void
    {
        if (is_resource($this->sock)) {
            @fclose($this->sock);
        }
        $this->sock = null;
    }

    /** @param int[] $expected */
    private function cmd(string $line, array $expected): string
    {
        $this->write($line . "\r\n");
        return $this->expect($expected);
    }

    private function write(string $data): void
    {
        if (!is_resource($this->sock) || @fwrite($this->sock, $data) === false) {
            throw new SmtpException('Écriture impossible sur la connexion SMTP.');
        }
    }

    /** @param int[] $expected */
    private function expect(array $expected): string
    {
        $reply = '';

        while (true) {
            if (!is_resource($this->sock)) {
                throw new SmtpException('Connexion SMTP fermée.');
            }

            $line = @fgets($this->sock, 1024);

            if ($line === false) {
                $meta = stream_get_meta_data($this->sock);
                throw new SmtpException(!empty($meta['timed_out'])
                    ? 'Le serveur SMTP ne répond pas.'
                    : 'Lecture impossible sur la connexion SMTP.');
            }

            $reply .= $line;

            // Une réponse multiligne porte un tiret en quatrième position
            // (« 250-… »), la dernière ligne une espace (« 250 … »).
            if (strlen($line) < 4 || $line[3] !== '-') {
                break;
            }
        }

        $code = (int) substr($reply, 0, 3);

        if (!in_array($code, $expected, true)) {
            throw new SmtpException('Réponse SMTP inattendue : ' . trim($reply));
        }

        return $reply;
    }

    private function heloName(): string
    {
        $host = gethostname();
        return ($host !== false && $host !== '') ? $host : 'localhost';
    }

    private function domainOf(string $address): string
    {
        $at = strrpos($address, '@');
        return $at === false ? 'localhost' : substr($address, $at + 1);
    }

    /* ------------------------------------------------------------ format -- */

    /** @param array{0:string,1:string} $box */
    private static function mailbox(array $box): string
    {
        [$address, $name] = $box;
        return $name === ''
            ? $address
            : self::encodeHeader($name) . ' <' . $address . '>';
    }

    /**
     * Encodage « encoded-word » (RFC 2047) pour les en-têtes non ASCII.
     * mbstring n'est pas installé, d'où le découpage manuel en tranches sûres :
     * on coupe sur des multiples de 3 octets pour ne jamais scinder un
     * caractère UTF-8 au milieu d'un groupe base64.
     */
    private static function encodeHeader(string $text): string
    {
        $text = str_replace(["\r", "\n"], ' ', trim($text));

        if (preg_match('/^[\x20-\x7E]*$/', $text) === 1) {
            // Purement ASCII imprimable : on protège juste les guillemets.
            return preg_match('/[",:;<>@\[\]\\\\]/', $text) === 1
                ? '"' . addcslashes($text, '"\\') . '"'
                : $text;
        }

        $out = [];
        foreach (str_split($text, 45) as $slice) {
            $out[] = '=?UTF-8?B?' . base64_encode($slice) . '?=';
        }

        return implode("\r\n ", $out);
    }

    /**
     * Un point en début de ligne termine le corps du message en SMTP ; il doit
     * donc être doublé. Sans ça, un message contenant une ligne « . » seule est
     * tronqué en silence.
     */
    private static function stuffDots(string $body): string
    {
        $body = str_replace(["\r\n", "\r", "\n"], "\n", $body);
        $body = str_replace("\n.", "\n..", $body);
        if (str_starts_with($body, '.')) {
            $body = '.' . $body;
        }
        return str_replace("\n", "\r\n", $body);
    }
}
