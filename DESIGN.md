---
name: Serious Labs
description: On installe. Vous gardez les clés.
colors:
  steel: "#1b1e22"
  steel-2: "#23272c"
  steel-0: "#131518"
  rule: "#353b42"
  ink: "#eef0f2"
  ink-2: "#aab2ba"
  brass: "#d4a64a"
  brass-2: "#e7c37a"
  paper: "#f3f1ec"
  paper-2: "#5c5a55"
  rouge: "#c4382a"
  jaune: "#f0c02c"
  vert: "#26804d"
  bleu: "#2e6bd0"
  orange: "#ee7a24"
  violet: "#6e46c2"
  turquoise: "#2aa9be"
  blanc: "#e4e6e8"
typography:
  display:
    fontFamily: "Big Shoulders, Arial Narrow, sans-serif"
    fontSize: "clamp(3.4rem, 10.5vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "0"
  display-hall:
    fontFamily: "Big Shoulders, Arial Narrow, sans-serif"
    fontSize: "clamp(4rem, 6.2vw, 5.4rem)"
    fontWeight: 900
    lineHeight: 1.06
    letterSpacing: "0"
  activity:
    fontFamily: "Big Shoulders, Arial Narrow, sans-serif"
    fontSize: "clamp(2.6rem, 6.4vw, 4.6rem)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "0"
  heading:
    fontFamily: "Big Shoulders, Arial Narrow, sans-serif"
    fontSize: "clamp(2.3rem, 5.4vw, 3.9rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "0"
  entry-title:
    fontFamily: "Big Shoulders, Arial Narrow, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "0"
  stamp:
    fontFamily: "Big Shoulders Stencil, Big Shoulders, sans-serif"
    fontSize: "1.9rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.02em"
  date:
    fontFamily: "Big Shoulders Stencil, Big Shoulders, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "0.02em"
    fontFeature: "tnum"
  lede:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body-sm:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  caption:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  meta:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
  label:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
rounded:
  none: "0"
  tag: "10px 10px 16px 16px"
  chip: "3px 3px 6px 6px"
spacing:
  gutter: "clamp(1rem, 4vw, 2.5rem)"
  band: "clamp(4.5rem, 10vw, 8rem)"
components:
  button-primary:
    backgroundColor: "{colors.brass}"
    textColor: "{colors.steel}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.4rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.brass-2}"
  key-tag:
    backgroundColor: "{colors.bleu}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tag}"
    typography: "{typography.stamp}"
    height: "8.5rem"
  key-tag-label:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.steel}"
    typography: "{typography.label}"
  input:
    backgroundColor: "{colors.steel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.7rem 0.8rem"
    height: "3rem"
  activity-row:
    backgroundColor: "{colors.steel}"
    textColor: "{colors.ink}"
    typography: "{typography.activity}"
    rounded: "{rounded.none}"
    padding: "1.6rem 0"
  activity-rule:
    backgroundColor: "{colors.brass}"
    height: "2px"
  registre-entry:
    backgroundColor: "{colors.steel}"
    textColor: "{colors.ink}"
    typography: "{typography.entry-title}"
    rounded: "{rounded.none}"
    padding: "1.35rem 0"
  registre-rule:
    backgroundColor: "{colors.rule}"
    height: "1px"
  registre-rule-active:
    backgroundColor: "{colors.brass}"
    height: "1px"
  registre-date:
    textColor: "{colors.brass}"
    typography: "{typography.date}"
  poincon:
    backgroundColor: "{colors.steel}"
    textColor: "{colors.brass}"
    rounded: "{rounded.none}"
    padding: "0.45rem"
    size: "2.75rem"
  poincon-active:
    backgroundColor: "rgb(212 166 74 / 0.08)"
    textColor: "{colors.brass}"
  peek:
    backgroundColor: "{colors.steel-2}"
    textColor: "{colors.ink-2}"
    typography: "{typography.caption}"
    rounded: "{rounded.none}"
    width: "27rem"
  peek-mark:
    backgroundColor: "{colors.steel}"
    textColor: "{colors.brass}"
    rounded: "{rounded.none}"
    padding: "1.2rem"
    size: "7rem"
---

# Design System: Serious Labs

Monde visuel : **« Vous gardez les clés »**, choisi par le client le 29 octobre
2026 parmi quatre directions. Il remplace « La journée, en sombre » (18
septembre 2026), à la demande du client de tout reprendre de zéro.

Le même jour, le monde s'est étendu à l'accueil de la société, qui le reprend
sans ses plastiques. La page de formation a quitté la racine pour `/formation/`
(`/en/training/` en anglais). L'accueil (`/` et `/en/`) charge
`assets/css/accueil.css` après `assets/css/style.css`, dont il garde le socle,
l'entête et le pied de page.

## Overview

La page de formation est l'armoire à clés de l'entreprise cliente. Chaque outil
installé est une clé remise au client ; chaque poste qui fait perdre du temps
est une étiquette de porte-clés pendue à un crochet de laiton, sur une tôle
perforée. Le visiteur décroche les étiquettes qui le concernent : elles volent
jusqu'à son trousseau, et sa demande part avec.

La métaphore tient du premier écran au pied de page : on prend les mesures, on
taille les clés, on lève les réserves à trente jours, les clés sont à vous.
Elle porte la promesse commerciale centrale, que les outils restent chez le
client et lui appartiennent.

L'accueil est le registre de l'atelier qui fabrique ces clés. Les activités
ouvertes y sont tenues en tête sous un filet de laiton ; les réalisations sont
inscrites dessous, une par ligne, à leur date, avec leur poinçon frappé dans un
carré, leur phrase et leur lien. Même acier, même laiton, mêmes trois polices ;
pas d'étiquette, pas de plastique, pas d'ombre.

Le monde refuse le bandeau sombre à dégradé de l'IA, la grille de cartes, le
grand visuel de studio créatif, et l'imprimé administratif abandonné en
septembre.

**Key Characteristics:**

- Acier anthracite et laiton, sur les deux pages.
- Huit plastiques, toujours avec leur numéro, et seulement dans l'armoire.
- Capitales condensées frappées pour les titres, pochoir pour les dates et les
  numéros.
- Une seule chose a une ombre : l'étiquette.
- Des lignes de registre, jamais des cartes.

## Colors

Contrastes mesurés sur les couleurs affichées, pas sur les intentions.

### Primary

- **Laiton** `#d4a64a` : action, crochets, anneau, repères de temps ; sur
  l'accueil, filets des activités, dates du registre et poinçons. 7,45:1 sur
  l'acier, et l'acier sur lui à 7,45:1, d'où le texte sombre des boutons. 6,69:1
  sur la tôle, 6,48:1 sur le lavis d'un poinçon actif (laiton à 8 % sur
  l'acier, soit `#2a2925`). Survol `#e7c37a`, à 9,94:1 sur l'acier.

### Neutral

- **Acier** `#1b1e22` : le fond, l'émail de l'armoire. Texte `#eef0f2` à
  14,6:1, texte secondaire `#aab2ba` à 7,8:1.
- **Tôle** `#23272c` : le tableau perforé, la section de demande, et l'écran de
  l'aperçu. Texte secondaire à 7,0:1.
- **Ombre** `#131518` : le pied de page, les trous de la tôle, le fond des
  captures en attente. Texte secondaire à 8,5:1.
- **Filet** `#353b42` : décoratif. À 1,48:1 sur l'acier, il sépare mais ne
  porte jamais d'information seul.
- **Papier** `#f3f1ec` : la fenêtre des étiquettes et la feuille de l'exemple.
  Acier dessus à 14,8:1, texte secondaire `#5c5a55` à 6,1:1.

### Les plastiques

Une couleur par étiquette, huit en tout, comme les porte-clés de quincaillerie.

| Jeton | Valeur | Texte | Contraste |
|---|---|---|---|
| `--rouge` | `#c4382a` | blanc | 5,32:1 ; sur papier 4,71:1 (texte biffé) |
| `--jaune` | `#f0c02c` | acier | 9,78:1 |
| `--vert` | `#26804d` | blanc | 4,91:1 |
| `--bleu` | `#2e6bd0` | blanc | 5,08:1 |
| `--orange` | `#ee7a24` | acier | 5,93:1 |
| `--violet` | `#6e46c2` | blanc | 6,33:1 |
| `--turquoise` | `#2aa9be` | acier | 5,99:1 |
| `--blanc` | `#e4e6e8` | acier | 13,37:1 |

Le rouge et le vert ont été assombris depuis `#d9402e` et `#2b8c55`, qui
échouaient à 4,45 et 4,21:1 dans les pastilles du formulaire.

### Named Rules

**La règle du numéro.** Une couleur ne dit jamais seule de quelle clé il
s'agit : chaque miniature du trousseau et chaque pastille du formulaire porte
son numéro frappé.

**La règle du laiton en surface.** Le laiton ne prend toute la surface qu'une
fois, dans la section où la page dit ce qui appartient au client.

**La règle des plastiques à l'armoire.** Les huit plastiques n'existent que là
où il y a des étiquettes. Ailleurs, l'acier et le laiton suffisent.

**La règle du filet ouvert.** Un filet de laiton de 2 px coiffe ce qui est
ouvert, l'activité qu'on peut commander ; un filet d'acier de 1 px sépare ce
qui est inscrit, la réalisation achevée. Une réalisation ne prend du laiton que
lorsqu'elle est active, et alors sur 1 px, tracé de gauche à droite.

## Typography

- **Big Shoulders** (900), en capitales condensées, pour les titres, les noms
  d'activité et les noms de réalisation : les numéros frappés au poinçon sur
  les crochets d'une armoire.
- **Big Shoulders Stencil** (800) pour les numéros des étiquettes, les chiffres
  des faits et les dates du registre.
- **Atkinson Hyperlegible Next** pour la prose et les libellés. Elle a été
  choisie pour la lecture sur téléphone d'un public non technique.

Les trois sont des polices variables auto-hébergées, latin et latin étendu,
déclarées dans `assets/css/fonts.css`. Aucun appel à Google.

### Hierarchy

Les tailles du système, de la plus grande à la plus petite. On en choisit une
dans cette liste avant d'en inventer une autre.

- **Titre d'ouverture** (formation) : `clamp(3.4rem, 10.5vw, 6rem)`, interligne
  0,86.
- **Titre d'accueil** : même taille sous 64rem ; au-delà,
  `clamp(4rem, 6.2vw, 5.4rem)` sur une seule ligne, pour que le registre
  affleure en bas du premier écran. Interligne 1,06 (voir la règle de la
  virgule).
- **Nom d'activité** : `clamp(2.6rem, 6.4vw, 4.6rem)`, interligne 0,88.
- **Titre de section** : `clamp(2.3rem, 5.4vw, 3.9rem)`, interligne 0,92 ; en
  petit, `clamp(1.9rem, 3.6vw, 2.6rem)`.
- **Pochoir** : 2rem pour l'année d'une activité (1,5rem quand la ligne se
  replie), 1,9rem pour le numéro d'étiquette, 1,3rem en chiffres tabulaires
  pour la date d'une réalisation.
- **Nom de réalisation** : 1,5rem, interligne 1,05, en capitales.
- **Chapeau** : 1,125rem, limité à 54ch sous le titre d'accueil et à 58ch sous
  un titre de section.
- **Corps** : 1,0625rem sur 1,6.
- **Petit corps** : 0,9375rem ; descriptions de réalisation (62ch au plus),
  faits d'une activité, liens du registre, navigation, pied de page.
- **Légende** : 0,875rem ; légende de l'aperçu et de la vidéo, barre du pied de
  page.
- **Mention** : 0,8125rem, régulier, pour la ligne de date d'une activité, la
  nature d'une réalisation et « Accès privé » ; en gras, c'est le libellé
  d'étiquette.

### Named Rules

**Pas de sur-titre.** Aucun libellé au-dessus d'un titre. « Exemple fictif »
est un tampon dans le coin de la feuille, pas un sur-titre.

**La règle de la virgule.** En capitales serrées, un interligne de 0,86 fait
descendre la virgule sur la ligne suivante, où elle se lit comme un accent
(« CONSTRÙIRE »). Un grand titre ponctué qui peut passer sur plusieurs lignes
prend 1,06.

## Layout

Largeur utile `min(100% - 2 × gouttière, 78rem)`. Sections séparées par des
filets et un rythme de `clamp(4.5rem, 10vw, 8rem)`.

Sur la formation, l'ouverture est en deux colonnes à partir de 64rem ; en
dessous, la question et le tableau passent avant les faits de l'offre. La vidéo
est limitée à 64rem de large : sa source fait 1280 px et ne doit pas être
agrandie.

Sur l'accueil, l'ouverture est serrée en haut (`clamp(2.75rem, 6vw, 4.5rem)`)
et n'a pas de marge basse : les deux activités suivent le chapeau, puis le
registre commence. Au-delà de 72rem, le registre et l'aperçu se partagent la
largeur (`minmax(0, 1fr)` et `minmax(20rem, 27rem)`, 3rem d'écart) ; en
dessous, une seule colonne.

Seuils en usage : 30rem (l'action de l'entête se raccourcit), 40rem
(téléphone), 52rem (la feuille d'exemple), 56rem (les sections en deux
colonnes de la formation), 64rem (ouverture en deux colonnes, titre d'accueil
sur une ligne), 72rem (aperçu du registre), 75rem (la ligne d'activité se
déplie sur quatre colonnes), 760px (la navigation se réduit).

## Elevation & Depth

Une seule chose a une ombre : l'étiquette, parce que c'est un objet qui pend.
`0 10px 18px -6px rgb(0 0 0 / .6)`, avec un reflet de plastique en dégradé
blanc de 22 % à 0. Les crochets portent une ombre de 2 px. Rien d'autre ne
flotte.

L'accueil n'a aucune ombre. Sa profondeur tient à deux choses : l'aperçu qui
reste collé à 6rem du haut pendant qu'on descend le registre, et la tôle
perforée qui tient lieu d'écran quand une réalisation n'a pas de capture.

## Shapes

Aucun rayon, sauf sur les objets : l'étiquette (`10px 10px 16px 16px`), ses
miniatures et les pastilles du formulaire, qui en sont la réduction. La tôle
perforée est un motif de trous de 1,6 px sur une grille de 18 px.

Sur l'accueil, tout est d'équerre : le carré du poinçon, l'écran de l'aperçu en
16:10, les captures, chacun dans un filet de 1 px. Les seuls arrondis sont
dans le tracé de certains poinçons, à l'intérieur du dessin.

## Components

### Buttons

Le bouton d'action est un aplat de laiton, texte acier, hauteur 3rem, sans
rayon. Le bouton « Valider » de l'exemple est un aplat d'acier sur papier,
désactivé en `#d9d5cc` avec un texte `#4a4843` à 6,2:1.

### L'étiquette (composant signature de la formation)

Il s'agit d'un `<button aria-pressed>` qui porte un œillet, un numéro au
pochoir et une fenêtre de papier.

- **Au survol**, elle penche de 5°.
- **Choisie**, un double vole jusqu'à l'anneau du trousseau, en 720 ms. Le
  crochet garde alors la silhouette en pointillé et le numéro, pour qu'on
  puisse la raccrocher.
- **Raccrochée**, elle revient en balançant.
- **En mouvement réduit**, rien ne vole : l'état change seul.
- **Sur téléphone**, elle pend à l'horizontale, crochet à gauche.

### Le trousseau

C'est un anneau de laiton en SVG, sous lequel les miniatures pendent en
éventail, jusqu'à 78°, chacune avec son numéro. À côté, le compteur, et
l'action qui devient « Demander ces N clés ». Sur téléphone, une barre basse
reprend le compte dès que l'anneau sort de l'écran.

### L'exemple

C'est une feuille de papier, avec un onglet par clé, qui suit la dernière clé
décrochée. Le passage faux est un bouton souligné en pointillé rouge. Tant
qu'il n'est pas corrigé, la case « J'ai relu et corrigé » reste fermée, et
« Valider » reste fermé tant qu'elle n'est pas cochée. Sans script, la
correction s'affiche d'emblée.

### La ligne d'activité

Une activité ouverte, à pleine largeur, sous son filet de laiton de 2 px. Au
chargement, le filet se trace de gauche à droite en 1,1 s (la seconde ligne
avec 0,2 s de retard) ; en mouvement réduit, il est déjà tracé.

- **Au-delà de 75rem**, quatre colonnes : la date (8rem, mention et année au
  pochoir), le nom et sa phrase, les faits (13rem, séparés par des filets
  d'acier), l'action (13,5rem). Écarts de 1,25rem sur 2,5rem.
- **Jusqu'à 75rem**, la date passe sur une ligne au-dessus du nom, les faits
  s'alignent à la suite, chacun précédé d'un tiret de laiton de 0,5rem sur
  2 px, et l'action se cale en bas à droite.
- **Jusqu'à 40rem**, l'action prend toute la largeur sous les faits.
- **Toute la ligne est la cible.** Le lien est sur le nom, et s'étend à la
  ligne entière. L'action est un bouton de laiton dessiné, masqué aux lecteurs
  d'écran et inerte au pointeur ; il s'éclaire au survol de la ligne, comme le
  nom.

### L'entrée du registre (composant signature de l'accueil)

Une réalisation par ligne, du plus récent au plus ancien, entre deux filets
d'acier de 1 px.

- **Au-delà de 40rem**, quatre colonnes : la date au pochoir de laiton, avec la
  nature en mention dessous (6,5rem) ; le poinçon (2,75rem) ; le nom, la phrase
  et, sous 72rem, la capture ; le lien (largeur du contenu). Écarts de 0,3rem
  sur 1,25rem, 1,35rem de marge verticale.
- **Jusqu'à 40rem**, deux colonnes : le poinçon à gauche sur toute la hauteur ;
  à droite la date, la nature calée à sa droite, le nom, la phrase, la capture,
  puis le lien.
- **Le lien** « Ouvrir » est souligné de laiton, porte une flèche de sortie et
  un complément réservé aux lecteurs d'écran ; il s'étend à toute la ligne. Une
  réalisation privée n'a pas de lien : « Accès privé » ou « Pas de lien
  public », en mention.
- **Active** (survol au-delà de 72rem, focus partout), un filet de laiton de
  1 px se trace sur le filet du bas en 0,6 s, et le carré du poinçon passe au
  laiton avec un lavis de laiton à 8 %.

### L'anneau de focus des lignes

Pour les lignes d'activité et du registre, le focus du lien est porté par la
ligne entière : un anneau de laiton de 3 px, décalé de 4 px pour une activité
et de 2 px pour une entrée. Le lien lui-même n'a pas d'anneau. Un navigateur
sans `:has()` garde l'anneau sur le lien, décalé de 3 px.

### Le poinçon

Le pictogramme d'une réalisation, frappé au trait de laiton dans un carré
d'acier.

- **Grammaire** : grille de 48, trait de 2,4 en couleur courante, bouts et
  angles ronds, aucun remplissage hors quelques points pleins (rayon 1,7 à
  2,3). La flèche de sortie des liens est dessinée dans la même grammaire.
- **Fichier** : une planche de symboles, `assets/img/poincons.svg`, appelée par
  `<use>`. Chaque tracé porte ses attributs de présentation : la politique de
  sécurité du site refuse tout `<style>` en ligne.
- **Cadre** : carré de 2,75rem, filet de 1 px, marge intérieure de 0,45rem,
  sans rayon.
- **Exception** : LEVELUM garde sa propre marque, le losange croisé à huit
  points, redessinée à cette échelle et dans ce trait.

### L'aperçu

À partir de 72rem, une colonne collante à droite du registre montre l'écran de
la réalisation active, et la première au chargement.

- **L'écran** : 16:10, filet de 1 px, la capture cadrée par le haut.
- **Le changement** : l'écran suivant se déroule de haut en bas en 0,7 s,
  comme une page qu'on tourne. En mouvement réduit, il change sans transition.
- **Une réalisation privée** n'a pas de capture : l'écran devient la tôle
  perforée, et le poinçon y est frappé en grand (7rem, filet de laiton, fond
  acier), en 0,5 s.
- **La légende**, en dessous : le nom en gras à gauche, le domaine du lien ou
  la mention d'accès à droite.
- L'aperçu double un contenu déjà présent dans la ligne : il est masqué aux
  lecteurs d'écran. Les captures sont préchargées au repos, sur grand écran
  seulement.
- **Sous 72rem**, il n'y a pas d'aperçu : la capture est dans la ligne, sous la
  phrase, jusqu'à 30rem de large, dans un filet de 1 px, chargée à la demande.

### Les captures du registre

Les images de `assets/img/registre/` sont de vraies pièces : des captures
d'écran des sites, prises avec Playwright le 29 octobre 2026 et réduites à
960 × 600 en WebP, sans retouche ; pour Breakout Hebdo, la miniature d'un
épisode, hébergée sur le site. Chacune a sa provenance dans le fichier `.json`
qui l'accompagne.

### Inputs / Fields

Les champs ont un fond acier, un filet de 1 px et un bas de 2 px, qui passe au
laiton au focus et au rouge en erreur. Les clés choisies s'affichent en
pastilles au-dessus du message, et sont jointes à l'envoi si le message ne les
cite pas.

### Navigation

L'entête est collante, en acier translucide flouté. Sur la formation, il porte
les sections de la page, la langue et l'action ; sous 760 px, il ne reste que
la langue et l'action ; sous 30rem, l'action se raccourcit en « Demander ».

Sur l'accueil, il n'y a pas d'action : « Formation · Conseil · Réalisations ·
EN », et la marque est marquée comme page courante. Sous 760 px, il ne reste
que la marque et la langue.

## Do's and Don'ts

### Do:

- Accrocher toute nouvelle section à la métaphore des clés ou à celle du
  registre, ou la laisser neutre.
- Vérifier le contraste sur les couleurs calculées, à chaque plastique
  et à chaque lavis.
- Signaler toute démonstration comme exemple fictif.
- Inscrire toute nouvelle réalisation comme une ligne du registre : date
  au pochoir, poinçon dans la grammaire de la planche, phrase, lien ou mention
  d'accès, et une capture réelle avec sa provenance.

### Don't:

- Pas de carte, pas d'ombre décorative, pas de dégradé de fond.
- Pas de couleur sans numéro pour désigner une clé.
- Pas de chiffre de gain, de témoignage ou de logo client.
- Pas de bandeau ni de fenêtre à l'arrivée : le site n'en a pas
  besoin, il n'a ni cookie ni traceur.
- Pas de pictogramme pris dans une bibliothèque, pas de maquette ni
  d'image générée à la place d'une capture.
