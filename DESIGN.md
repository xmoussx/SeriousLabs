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
  heading:
    fontFamily: "Big Shoulders, Arial Narrow, sans-serif"
    fontSize: "clamp(2.3rem, 5.4vw, 3.9rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "0"
  stamp:
    fontFamily: "Big Shoulders Stencil, Big Shoulders, sans-serif"
    fontSize: "1.9rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.02em"
  body:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
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
---

# Design System: Serious Labs

Monde visuel : **« Vous gardez les clés »**, choisi par le client le 29 octobre
2026 parmi quatre directions. Il remplace « La journée, en sombre » (18
septembre 2026), à la demande du client de tout reprendre de zéro.

## Overview

La page est l'armoire à clés de l'entreprise cliente. Chaque outil installé
est une clé remise au client ; chaque poste qui fait perdre du temps est une
étiquette de porte-clés pendue à un crochet de laiton, sur une tôle perforée.
Le visiteur décroche les étiquettes qui le concernent : elles volent jusqu'à
son trousseau, et sa demande part avec.

La métaphore tient du premier écran au pied de page : on prend les mesures, on
taille les clés, on lève les réserves à trente jours, les clés sont à vous.
Elle porte la promesse commerciale centrale, que les outils restent chez le
client et lui appartiennent.

Elle refuse le bandeau sombre à dégradé de l'IA, la grille de cartes, et
l'imprimé administratif abandonné en septembre.

## Colors

Contrastes mesurés sur les couleurs affichées, pas sur les intentions.

### Primary

- **Laiton** `#d4a64a` : action, crochets, anneau, repères de temps. 7,45:1
  sur l'acier, et l'acier sur lui à 7,45:1, d'où le texte sombre des boutons.
  Survol `#e7c37a`.

### Neutral

- **Acier** `#1b1e22` : le fond, l'émail de l'armoire. Texte `#eef0f2` à
  14,6:1, texte secondaire `#aab2ba` à 7,8:1.
- **Tôle** `#23272c` : le tableau perforé et la section de demande. Texte
  secondaire à 7,0:1.
- **Ombre** `#131518` : le pied de page. Texte secondaire à 8,5:1.
- **Filet** `#353b42` : décoratif, ne porte jamais d'information.
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

## Typography

- **Big Shoulders** (900), en capitales condensées, pour les titres : les
  numéros frappés au poinçon sur les crochets d'une armoire.
- **Big Shoulders Stencil** (800) pour les numéros des étiquettes et les
  chiffres des faits.
- **Atkinson Hyperlegible Next** pour la prose et les libellés. Elle a été
  choisie pour la lecture sur téléphone d'un public non technique.

Les trois sont des polices variables auto-hébergées, latin et latin étendu,
déclarées dans `assets/css/fonts.css`. Aucun appel à Google.

### Hierarchy

- Titre d'ouverture : `clamp(3.4rem, 10.5vw, 6rem)`, interligne 0,86.
- Titre de section : `clamp(2.3rem, 5.4vw, 3.9rem)`, interligne 0,92.
- Corps : 1,0625rem sur 1,6 ; chapeau de section 1,125rem, limité à 58ch.
- Libellé d'étiquette : 0,8125rem, gras.

### Named Rules

**Pas de sur-titre.** Aucun libellé au-dessus d'un titre. « Exemple fictif »
est un tampon dans le coin de la feuille, pas un sur-titre.

## Layout

Largeur utile `min(100% - 2 × gouttière, 78rem)`. Sections séparées par des
filets et un rythme de `clamp(4.5rem, 10vw, 8rem)`. L'ouverture est en deux
colonnes à partir de 64rem ; en dessous, la question et le tableau passent
avant les faits de l'offre. La vidéo est limitée à 64rem de large : sa source
fait 1280 px et ne doit pas être agrandie.

## Elevation & Depth

Une seule chose a une ombre : l'étiquette, parce que c'est un objet qui pend.
`0 10px 18px -6px rgb(0 0 0 / .6)`, avec un reflet de plastique en dégradé
blanc de 22 % à 0. Les crochets portent une ombre de 2 px. Rien d'autre ne
flotte.

## Shapes

Aucun rayon, sauf sur les objets : l'étiquette (`10px 10px 16px 16px`), ses
miniatures et les pastilles du formulaire, qui en sont la réduction. La tôle
perforée est un motif de trous de 1,6 px sur une grille de 18 px.

## Components

### Buttons

Le bouton d'action est un aplat de laiton, texte acier, hauteur 3rem, sans
rayon. Le bouton « Valider » de l'exemple est un aplat d'acier sur papier,
désactivé en `#d9d5cc` avec un texte `#4a4843` à 6,2:1.

### L'étiquette (composant signature)

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

### Inputs / Fields

Les champs ont un fond acier, un filet de 1 px et un bas de 2 px, qui passe au
laiton au focus et au rouge en erreur. Les clés choisies s'affichent en
pastilles au-dessus du message, et sont jointes à l'envoi si le message ne les
cite pas.

### Navigation

L'entête est collante, en acier translucide flouté. Sous 760 px, il ne reste
que la langue et l'action ; sous 30rem, l'action se raccourcit en « Demander ».

## Do's and Don'ts

### Do:

- Accrocher toute nouvelle section à la métaphore des clés, ou la laisser
  neutre.
- Vérifier le contraste sur les couleurs calculées, à chaque plastique.
- Signaler toute démonstration comme exemple fictif.

### Don't:

- Pas de carte, pas d'ombre décorative, pas de dégradé de fond.
- Pas de couleur sans numéro pour désigner une clé.
- Pas de chiffre de gain, de témoignage ou de logo client.
- Pas de bandeau ni de fenêtre à l'arrivée : la page n'en a pas besoin, elle
  n'a ni cookie ni traceur.
