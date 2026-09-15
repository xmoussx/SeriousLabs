---
name: Serious Labs
description: Le carnet à souche — un carnet de devis autocopiant, trois feuillets de couleur, un pré-imprimé bleu et un tampon qui marque l'état.
colors:
  ply-original: "#fcfbf7"
  ply-canari: "#f0d24b"
  ply-rose: "#efb8c0"
  ink: "#16181a"
  ink-2: "#44474b"
  rule: "#2c5aa0"
  rule-soft: "#9db2d4"
  stamp: "#8e2340"
  carbon: "#6b6862"
  on-canari: "#453804"
  on-canari-2: "#5f4e06"
  on-rose: "#4d1f27"
  on-rose-2: "#6d3a43"
typography:
  display:
    fontFamily: "Archivo Black, Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 5.3vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-.032em"
  total:
    fontFamily: "Archivo Black, Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 5.6vw, 3.9rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-.04em"
    fontFeature: "tabular-nums"
  headline:
    fontFamily: "Archivo Black, Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.6vw, 2.9rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-.028em"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 700
  lede:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.02rem, 1.45vw, 1.16rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  typed:
    fontFamily: "Courier Prime, ui-monospace, Courier New, monospace"
    fontSize: "1em"
    fontWeight: 400
    letterSpacing: "-.01em"
    fontFeature: "tabular-nums"
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: ".6875rem"
    fontWeight: 600
    letterSpacing: ".12em"
    textTransform: "uppercase"
  stamp:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: ".6875rem"
    fontWeight: 700
    letterSpacing: ".14em"
    textTransform: "uppercase"
rounded:
  none: "0"
spacing:
  gutter: "clamp(1.15rem, 4vw, 4rem)"
  sheet: "clamp(3.75rem, 7vw, 6.5rem)"
  sheet-first: "clamp(1.6rem, 2.6vw, 2.5rem) clamp(2rem, 3.2vw, 2.75rem)"
  measure: "1180px"
  head-h: "5.5rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ply-original}"
    rounded: "{rounded.none}"
    padding: ".85rem 1.5rem"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.stamp}"
    textColor: "{colors.ply-original}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: ".85rem 1.5rem"
    height: "48px"
  button-quiet-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ply-original}"
  button-stamp:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ply-original}"
    rounded: "{rounded.none}"
    padding: ".85rem 1.5rem"
    height: "48px"
  input-field:
    backgroundColor: "{colors.ply-original}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: ".7rem .8rem"
    height: "48px"
  box:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1.5rem 1.35rem 1.4rem"
  box-cap:
    backgroundColor: "{colors.ply-original}"
    textColor: "{colors.rule}"
    typography: "{typography.label}"
    padding: "0 .5rem"
  stub:
    backgroundColor: "rgba(252, 251, 247, .42)"
    textColor: "{colors.on-rose}"
    rounded: "{rounded.none}"
    padding: "1.5rem 1.4rem 1.4rem"
  stamp:
    backgroundColor: "transparent"
    textColor: "{colors.stamp}"
    typography: "{typography.stamp}"
    rounded: "{rounded.none}"
    padding: ".34rem .6rem .28rem"
  tick:
    backgroundColor: "transparent"
    textColor: "{colors.on-rose}"
    padding: ".62rem .2rem"
    height: "44px"
  tick-box:
    backgroundColor: "rgba(252, 251, 247, .55)"
    rounded: "{rounded.none}"
    size: "20px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.none}"
    padding: "0 clamp(.6rem, 1.3vw, 1.05rem)"
  nav-link-hover:
    backgroundColor: "{colors.ply-canari}"
    textColor: "{colors.ink}"
  nav-action:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ply-original}"
    rounded: "{rounded.none}"
    padding: "0 clamp(.6rem, 1.3vw, 1.05rem)"
  nav-action-hover:
    backgroundColor: "{colors.stamp}"
    textColor: "{colors.ply-original}"
  status-ok:
    backgroundColor: "{colors.ply-canari}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: ".95rem 1.1rem"
  status-error:
    backgroundColor: "transparent"
    textColor: "{colors.stamp}"
    rounded: "{rounded.none}"
    padding: ".95rem 1.1rem"
  perf:
    backgroundColor: "{colors.ply-original}"
    height: "26px"
    width: "100%"
---

# Design System: Serious Labs

## Overview

**Creative North Star: « Le carnet à souche »**

La page n'illustre pas un carnet de devis autocopiant : elle en est un. Trois
feuillets de couleur occupent des régions entières, bord à bord, séparés par de
vraies perforations percées à travers lesquelles on voit le feuillet du dessous.
Ce qui est imprimé d'avance — intitulés, filets de cases, en-têtes de colonnes,
bloc de référence — est au bleu de devis. Ce qui a été rempli — dates, quantités,
totaux, montants — est en Courier Prime, avec le demi-pixel de décalage que le
carbone d'une liasse a toujours sur la frappe. L'état ne se dit jamais par une
teinte : il se dit par un tampon posé de travers.

Le monde remplace une direction suisse noir et blanc, et il la refuse aussi
fermement qu'il refuse le bandeau sombre à dégradé de la catégorie IA. La
conséquence pratique est qu'il n'y a **aucune carte** dans ce système : les cases
du formulaire — `.box`, `.stub` — sont les seuls conteneurs, et elles portent leur
intitulé dans l'angle, à la manière d'une légende de `fieldset`, jamais en
sur-titre au-dessus d'un titre. Il n'y a pas non plus d'ombre portée : la
profondeur est l'épaisseur de la liasse elle-même.

La densité est celle d'un imprimé administratif : des filets fins, beaucoup de
valeurs alignées à droite en chiffres tabulaires, des capitales à 11 px pour le
pré-imprimé et des blocs de titre en Archivo Black très serré. L'ensemble est
immobile : une seule animation existe dans toute la page.

**Key Characteristics:**

- Trois feuillets de couleur pleine largeur, jamais des cartes posées sur un fond.
- Pré-imprimé bleu de devis / valeurs remplies en Courier Prime : deux mains
  distinctes, jamais interverties.
- Encre secondaire teintée depuis le feuillet, jamais grise.
- L'état se marque au tampon, il ne change pas de teinte.
- Angle droit partout : aucun rayon de bordure dans tout le système.
- Aucune ombre d'élévation ; la seule ombre est le décalage de carbone.
- Une seule animation : le total frappé au tampon quand il change.

## Colors

Un papier crème, deux papiers de couleur saturée, et trois encres : le bleu du
pré-imprimé, le noir de la frappe, le rouge du tampon. Chaque feuillet emporte sa
propre famille d'encres secondaires.

### Primary

- **Bleu de devis** (`{colors.rule}`) : la couleur du pré-imprimé, celle qui
  existait avant que quiconque remplisse quoi que ce soit. Elle porte les
  intitulés en capitales (`.box__cap`, `.slip__t`, `.ref dt`, `.coords dt`,
  `.exec__when`, `.doc__body dt`), les filets de cases et de lignes, le chevron du
  `select`, la molette de la barre de défilement, et le liquide de la fiole du
  logo. Elle ne porte jamais un titre ni un paragraphe.
- **Bleu de filet** (`{colors.rule-soft}`) : la même encre délavée, réservée aux
  filets d'un pixel — cadre de `.box` et de `.ref`, séparateur entre liens de
  navigation, pointillés de `.terms__row` et `.coords`, bas de ligne de
  `.exec__row`. Texte interdit : à 2,08:1 sur l'original, elle n'est lisible pour
  rien d'autre qu'un trait.

### Secondary

- **Rouge de tampon** (`{colors.stamp}`) : l'unique accent. Il ne remplit jamais
  une surface au repos. Il encadre le mot pivot de l'énoncé et les pastilles
  `.stamp`, trace la croix des cases cochées, marque la poignée du curseur,
  colore le curseur de saisie et l'anneau de focus, épaissit la bordure d'un champ
  en erreur, et devient le fond d'un bouton survolé. Sa rareté est le sujet.

### Tertiary

- **Canari** (`{colors.ply-canari}`) : le deuxième pli de la liasse. Il occupe des
  sections entières (`.sheet--canari`), et réapparaît en fond de survol dans la
  navigation, en fond du message de succès, et en couleur des liens du pied. C'est
  aussi la `theme-color` déclarée par les quatre pages.
- **Rose carbone** (`{colors.ply-rose}`) : le troisième pli, celui du
  calculateur. Il ne sert à rien d'autre qu'à cette région.

### Neutral

- **Original crème** (`{colors.ply-original}`) : le premier pli, fond du `body`,
  des feuillets non colorés, des champs de formulaire quelle que soit la région,
  et texte du pied sombre.
- **Encre de frappe** (`{colors.ink}`) : titres, valeurs, fond des boutons, fond
  du pied de page, filets d'accentuation à 2 px (`.pad-head`, `.slip`, `.exec`,
  `.rule-of-house`, `.doc__body h2`).
- **Encre atténuée** (`{colors.ink-2}`) : corps de texte courant sur feuillet
  original (`.prose`, `.top__lede`, `.exec__d`, `.doc__body p`), liens de
  navigation au repos, unités du tableau.
- **Carbone** (`{colors.carbon}`) : la teinte du décalage de carbone
  (`rgba(107, 104, 98, .3)` en `text-shadow`) et la couleur des textes indicatifs
  de champ.
- **Encres du canari** (`{colors.on-canari}`, `{colors.on-canari-2}`) : le brun
  olive profond et sa variante moyenne, dans lesquelles tout texte posé sur le
  feuillet canari est écrit.
- **Encres du rose** (`{colors.on-rose}`, `{colors.on-rose-2}`) : le bordeaux
  sombre et sa variante moyenne, équivalents pour le feuillet rose.

### Named Rules

**La règle de l'encre du pli.** Toute encre secondaire est teintée depuis le
feuillet sur lequel elle repose ; jamais du gris. Un gris posé sur le canari passe
sous le seuil de contraste et salit la teinte : `{colors.carbon}` sur canari donne
3,71:1, là où `{colors.on-canari-2}` donne 5,44:1 pour un rôle identique. Tout
nouveau feuillet de couleur arrive donc avec son couple d'encres, pas avec un gris.

**La règle du tampon.** L'état se marque, il ne se colore pas. Un élément qui
change d'état reçoit une marque — un cadre incliné, une croix, un trait épaissi —
et jamais un simple changement de teinte. Le corollaire d'accessibilité est direct :
aucune information de ce système n'est portée par la seule couleur.

**La règle du bleu qui ne parle pas.** Le bleu de devis est la voix de l'imprimeur,
pas celle de l'auteur. Il n'écrit que ce qui serait déjà sur le papier vierge :
intitulés, filets, en-têtes. Un titre, une phrase ou une valeur en bleu est une
faute de fabrication.

**La règle du seuil dans le pied.** Le rouge de tampon sur l'encre du pied tombe à
2,09:1 : dans `.pad-foot`, l'anneau de focus reprend le canari, et sur
`.sheet--canari` il reprime l'encre de frappe. L'accent cède la place dès qu'il
n'est plus lisible.

## Typography

**Display Font:** Archivo Black (auto-hébergée, un seul poids : 400)
**Body Font:** Archivo (auto-hébergée, poids 400, 500, 600, 700)
**Label/Mono Font:** Courier Prime (auto-hébergée, poids 400 et 700)

Les trois familles sont servies depuis `/assets/fonts/` en WOFF2, en `font-display:
swap`, découpées en sous-ensembles latin et latin-ext. Aucune ressource typographique
n'est appelée chez un tiers.

**Character:** Archivo Black est le bloc imprimé : massif, très serré (jusqu'à
-.04em), il ne sert qu'aux énoncés et aux chiffres qui comptent. Archivo en 600/700
est la main de l'imprimeur : capitales à 11 px largement interlettrées pour tout ce
qui est pré-imprimé. Courier Prime est la machine à écrire du client : elle n'écrit
que ce qui a été rempli.

### Hierarchy

- **Display** (`{typography.display}`) : l'énoncé du premier feuillet, `.statement`.
  Une seule occurrence par page. `text-wrap: balance`.
- **Total** (`{typography.total}`) : le montant de la souche, `.total`. C'est le
  seul autre emploi d'Archivo Black à grande échelle, et le seul élément animé.
- **Headline** (`{typography.headline}`) : les titres de section, `.heading`, un par
  feuillet. Deux variantes mineures de la même main existent : le claim du pied
  (`clamp(1.15rem, 2.3vw, 1.65rem)`, `-.024em`) et la première phrase de
  `.rule-of-house` (`clamp(1.1rem, 2vw, 1.5rem)`, `-.02em`), plus les `h2` des pages
  de texte (`1.2rem`, `-.02em`).
- **Title** (`{typography.title}`) : Archivo 700 à 1,05 rem, les intitulés d'étape
  de `.exec__t`.
- **Lede** (`{typography.lede}`) : le paragraphe d'attaque sous l'énoncé,
  `.top__lede`, mesuré à 54ch.
- **Body** (`{typography.body}`) : `.prose`, mesuré à 68ch, en encre atténuée du
  feuillet, avec `text-wrap: pretty`.
- **Typed** (`{typography.typed}`) : les valeurs remplies. Réservé — voir la règle
  des trois mains.
- **Label** (`{typography.label}`) : le pré-imprimé. 11 px, 600, `.12em`, capitales,
  en bleu de devis. Employé dans `.box__cap`, `.ref dt`, `.coords dt`,
  `.lines caption`, `.lines thead th`, `.lines .unit`, `.exec__when`,
  `.doc__body dt`, avec des interlettrages voisins de .1em à .16em selon le rôle.
- **Stamp** (`{typography.stamp}`) : la pastille d'état. 11 px, 700, `.14em`,
  capitales, encadrée de 2 px et inclinée.

### Named Rules

**La règle des trois mains.** Archivo Black titre, Archivo pré-imprime, Courier
Prime remplit. Courier Prime est réservée aux valeurs, aux chiffres et aux mesures :
dates (`.typed[data-today]`), quantités du relevé (`.lines .qty`), valeurs de
conditions (`.terms__row dd`), sorties du calculateur (`.field__val`, `.split__v`,
`.tick__rate`, bornes de `.scale`), saisies d'hypothèses, numéros d'identification
des mentions légales, code de langue de la navigation. Un mot qui n'est pas une
valeur mesurée n'est jamais en Courier Prime ; une valeur mesurée n'est jamais
autrement.

**La règle du hors-registre.** Toute valeur remplie porte
`text-shadow: .55px .55px 0 rgba(107, 104, 98, .3)`. C'est le carbone de la liasse,
qui ne retombe jamais tout à fait sur la frappe. Un demi-pixel suffit à le dire ;
davantage devient une ombre portée, que ce monde n'a pas.

**La règle du faux italique.** Archivo Black n'a pas d'italique dessiné. Tout `<em>`
dans un titre doit repasser en `font-style: normal` et recevoir sa marque autrement
— dans `.statement em`, un cadre au tampon incliné de -1,4°. Un `<em>` non neutralisé
produit un penché synthétisé par le navigateur, qui est un défaut de fabrication.

**La règle des chiffres alignés.** Tout chiffre susceptible de changer sous les yeux
du lecteur est en chiffres tabulaires : `.typed`, `.lines .qty`, `.total`,
`.split__v`, les saisies d'hypothèses. Une colonne de chiffres ne doit jamais
frémir latéralement quand sa valeur change.

## Layout

**Le modèle est l'empilement de feuillets, pas la grille de cartes.** Chaque
`.sheet` est une bande pleine largeur qui porte sa propre couleur de papier ; le
contenu est ramené au centre par `.wrap`, large de `{spacing.measure}` au plus, avec
une gouttière latérale `{spacing.gutter}` qui va de 1,15 rem sur téléphone à 4 rem
sur grand écran. La respiration verticale d'un feuillet est `{spacing.sheet}` en
haut et en bas ; le premier feuillet est la seule exception, resserré à
`{spacing.sheet-first}` pour que la perforation reste au plus près de la première
fenêtre.

L'en-tête `.pad-head` est collant en haut (`z-index: 60`), haut de 62 px au minimum,
avec `scroll-padding-top: {spacing.head-h}` sur `html` pour qu'une ancre ne dépose
pas sa cible sous la barre.

Les grilles à deux colonnes de ce système sont toutes asymétriques et toutes
repliées sur une colonne à leur propre seuil : `.top` (1,55fr / 1fr) sous 900 px,
`.head` (1fr / 1,05fr) sous 860 px, `.calc` (1fr / .82fr) sous 900 px, `.contact`
(.8fr / 1,2fr) sous 880 px, `.legal-grid` (1fr / .85fr) sous 860 px,
`.pad-foot__top` (1,3fr / 1fr) sous 760 px, `.form-grid` (deux colonnes égales) sous
620 px. `.exec__row` garde ses deux colonnes à toutes les tailles — la colonne de
temps passe de 11 rem à 7,25 rem sous 720 px mais ne repasse jamais au-dessus du
titre. Les seuils sont des littéraux dans le code ; il n'existe pas de jeton de
point de rupture.

Les mesures de lecture sont explicites : 68ch pour `.prose`, `.exec__d` et
`.doc__body`, 62ch pour la description d'une ligne de relevé, 60ch pour
`.rule-of-house`, 54ch pour le paragraphe d'attaque, 22ch pour le claim du pied.

À l'impression, l'en-tête, les blocs d'action, les formulaires et le bouton
d'hypothèses disparaissent, les feuillets repassent en noir sur blanc avec
1,5 rem de respiration, et les perforations sont retirées.

### Named Rules

**La règle de la perforation.** Deux régions de couleur ne se touchent jamais
directement. Le passage d'un feuillet au suivant est un `.perf` de 26 px de haut,
qui porte la couleur du feuillet du dessus et laisse voir, par des trous de 6,8 px
percés tous les 26 px, la couleur du feuillet du dessous. Toute nouvelle section
colorée arrive donc avec sa perforation.

## Elevation & Depth

**Ce système n'a aucune ombre d'élévation.** Il n'existe pas de vocabulaire
d'ombres, et aucun `box-shadow` de ce code ne sert à soulever quoi que ce soit : les
deux seuls déclarés sont internes au champ de formulaire — `inset 0 0 0 1px` pour
épaissir un champ en erreur, `inset 0 -2px 0` pour marquer un champ au point — et
sont des traits d'encre, pas de la profondeur.

La profondeur est celle du papier. Elle est produite par trois moyens, tous
matériels : la succession des feuillets de couleur, la perforation qui montre
littéralement le pli du dessous à travers ses trous et pose un filet
`rgba(22, 24, 26, .1)` d'un pixel en bas de la bande, et les fonds crème
semi-transparents posés sur un feuillet coloré (`rgba(252, 251, 247, .42)` pour la
souche, `.55` pour une case à cocher, `.8` pour une saisie d'hypothèse), qui se
lisent comme une zone plus fortement pressée du papier.

Le seul `text-shadow` du système est le décalage de carbone des valeurs remplies —
voir la règle du hors-registre. Ce n'est pas une ombre portée et il ne doit jamais
être grossi pour en devenir une.

### Named Rules

**La règle du papier plat.** Aucune ombre portée, aucun flou, aucun dégradé de
surface. Si un élément a besoin de se détacher, il reçoit un filet, une bordure de
2 px ou un fond crème translucide — jamais une élévation.

## Shapes

**L'angle droit, sans exception.** Tout le système est à `border-radius: 0`, et le
zéro est déclaré explicitement là où un navigateur imposerait autrement son propre
rayon : boutons, champs de saisie, poignée du curseur de réglage, molette de la
barre de défilement. Il n'existe qu'un seul jeton de forme, `{rounded.none}`.

Le vocabulaire des traits est celui de l'imprimé : un filet de 1 px pour un cadre de
case et pour une ligne de tableau ; un pointillé de 1 px pour une liste de paires
intitulé/valeur ; un trait de 2 px à l'encre de frappe pour ce qui ouvre ou ferme un
bloc (sous l'en-tête, sous le bandeau, en tête de `.exec`, autour de
`.rule-of-house`, au-dessus d'un `h2` de page de texte) ; une bordure de 2 px pour
les conteneurs qui comptent (`.stub`, `.stamp`, `.btn`).

Deux silhouettes reviennent et appartiennent en propre à ce monde. La **case à
intitulé encoché** : un cadre dont la légende est posée à cheval sur le trait
supérieur, à 1 rem du bord gauche, avec la couleur du feuillet en fond pour
interrompre le filet — c'est `.box` + `.box__cap`. Le **cadre de tampon** : une
bordure de 2 px inclinée de 1 à 2 degrés, en position absolue autour de l'élément
qu'elle marque, jamais dans le flux — `.stamp` (-1,6°), `.stamp--tilt-r` (+1,4°),
`.statement em::before` (-1,4°), `.btn--stamp::after` (-1,1°, +0,8° au survol).

Les cases à cocher ne sont jamais des aplats : elles se cochent à la croix, deux
traits de 2,5 px tracés en pseudo-éléments (`.tick__box`), ou deux dégradés
diagonaux dans une case de 15 px pour les listes (`.tick-list li::before`).

## Components

### Buttons

- **Forme :** rectangle strict (`{rounded.none}`), bordure de 2 px de la même
  couleur que le fond, hauteur minimale 48 px, `inline-flex` centré.
- **Primary** (`.btn`) : encre de frappe sur crème, Archivo 700 à .9375 rem.
  Survol : le fond et la bordure passent au rouge de tampon. Désactivé : opacité
  .5, curseur interdit, et le survol est neutralisé.
- **Quiet** (`.btn--quiet`) : fond transparent, texte à l'encre, bordure d'encre.
  Au survol il s'inverse et devient le bouton plein.
- **Wide** (`.btn--wide`) : le même bouton sur toute la largeur de son conteneur ;
  c'est la forme employée pour l'envoi du formulaire et pour le report du calcul.
- **Stamp** (`.btn--stamp`) : le geste propre au carnet. Un second cadre de 2 px au
  rouge de tampon est posé à -7 px tout autour, incliné de -1,1°. Au survol il
  bascule à +0,8° et passe à l'encre de frappe. L'action principale du premier
  feuillet est le seul emploi de cette variante sur chaque page.
- **Focus :** anneau de 2 px au rouge de tampon, décalé de 2 px.

### Inputs / Fields

- **Style :** fond crème quelle que soit la région, filet de 1 px, angle droit,
  hauteur minimale 48 px, `font-size: 1rem` — jamais moins, faute de quoi Safari iOS
  zoome de force à la mise au point.
- **Sur feuillet coloré :** le filet du pré-imprimé descend sous le seuil ; les
  champs, intitulés, textes indicatifs et cases reprennent les encres du pli
  (`.sheet--canari .f …`), et le chevron du `select` est redessiné dans la même
  encre.
- **Survol :** le filet passe du bleu délavé au bleu de devis plein.
- **Point :** bordure au rouge de tampon plus `inset 0 -2px 0` — un soulignement
  d'encre sous le champ — doublés de l'anneau de focus à 2 px.
- **Erreur :** `aria-invalid="true"` épaissit la bordure à 2 px au rouge de tampon
  et ajoute un liseré interne d'1 px. La forme change, pas seulement la teinte.
- **Cases à cocher :** `.tick` est une ligne de 44 px minimum, pointillée en bas,
  dont la case de 20 px reçoit une croix au tampon quand elle est cochée ; la case
  native est masquée en `opacity: 0` et garde le focus, qui est rendu par un anneau
  sur la case dessinée. Le consentement du formulaire utilise en revanche la case
  native avec `accent-color` au rouge de tampon.
- **Curseur de réglage :** piste de 2 px à l'encre du pli, poignée carrée de 22 px
  au rouge de tampon, sans rayon.

### Navigation

- **En-tête** (`.pad-head`) : barre collante, fond crème, trait de 2 px à l'encre en
  bas, hauteur minimale 62 px. Les liens sont étirés sur toute la hauteur et
  séparés par un filet vertical de 1 px, ce qui donne des cibles hautes sans
  padding vertical déclaré.
- **États :** au repos en encre atténuée à .8125 rem ; au survol, fond canari et
  texte à l'encre — l'arrivée du feuillet suivant dans la barre.
- **Action** (`.act`) : fond d'encre, texte crème, 700 ; au survol, fond au rouge de
  tampon. C'est le seul élément de la barre qui porte un fond au repos.
- **Langue** (`.lang`) : en Courier Prime à .75 rem — c'est un code, donc une valeur.
- **Responsive :** les ancres de section (`.opt`) disparaissent sous 880 px ; sous
  520 px le mot-symbole perd son lettrage et ne garde que la fiole, et l'action se
  resserre. Il n'y a ni menu déroulant ni panneau mobile : la barre se réduit
  jusqu'à ne plus contenir que la marque, la langue et l'action.
- **Mot-symbole** (`.mark`) : la fiole en SVG suivie de SERIOUS LABS en Archivo
  Black à .95 rem, avec 21 px de hauteur de fiole. La fiole est tracée à l'encre de
  frappe et son liquide est au bleu de devis ; le nom et la fiole sont les seuls
  éléments d'identité contraignants, et rien d'autre dans ce système ne cherche à
  faire logo. Dans le pied, la fiole est renversée par `filter: invert(1)
  brightness(1.6)` plutôt que par un second fichier.
- **Pied** (`.pad-foot`) : la seule région à l'encre pleine. Il ouvre sur `.souche`,
  la ligne en capitales canari qui nomme le talon conservé, puis le mot-symbole
  inversé par filtre, le claim en Archivo Black, et deux niveaux de liens à
  `rgba(252, 251, 247, .78)` puis `.62`, qui passent au canari au survol.

### Cards / Containers

**Il n'y a pas de cartes.** Les seuls conteneurs sont les cases du formulaire.

- **`.box`** — la case à intitulé encoché : filet de 1 px, fond transparent (le
  feuillet reste visible à travers), intitulé en pré-imprimé posé à cheval sur le
  trait haut. Sur feuillet coloré, le filet et l'intitulé reprennent les encres du
  pli.
- **`.stub`** — la souche du calculateur : bordure de 2 px à l'encre du rose, fond
  crème à 42 %, intitulé de champ, total, ventilation en deux valeurs, action et
  avertissements. C'est le talon que l'on garde.
- **`.ref`** — le bloc de référence du bandeau : une grille de paires
  intitulé/valeur encadrée d'un filet, intitulés en pré-imprimé, valeurs en Courier
  Prime.
- **`.slip`** — le bandeau pré-imprimé qui court en tête du premier feuillet, fermé
  par un trait de 2 px. C'est lui qui dit « carnet » avant toute lecture.

### Le relevé (`.lines`)

Le tableau est composé comme la grille d'un devis : désignation à gauche, quantité
alignée à droite en Courier Prime derrière un filet vertical, unité en pré-imprimé.
Les en-têtes sont en capitales de 11 px sous un trait de 2 px, les lignes se
séparent d'un filet `currentColor` — donc automatiquement teinté par le feuillet —
et le survol d'une ligne pose un voile de 4,5 % à l'encre du pli.

Sous 880 px, le tableau sort **entièrement** du mode tabulaire : `table`, `caption`
et `tbody` passent en `display: block`, `thead` est escamoté hors de l'écran par
`clip-path`, et chaque ligne devient une grille `auto auto 1fr` où la désignation
occupe toute la largeur et où quantité et unité se rangent dessous. La sémantique
perdue est rendue par des rôles ARIA explicites dans le HTML (`role="table"`,
`rowgroup`, `row`, `columnheader`, `cell`).

### La souche et le total (`.stub`, `.total`)

Le montant est en Archivo Black à `clamp(2.4rem, 5.6vw, 3.9rem)`, chiffres
tabulaires, à l'encre de frappe — jamais au rouge de tampon, qui reste l'encre de
l'état. Il porte `aria-live="polite"`.

**C'est l'unique moment animé de toute la page.** Quand, et seulement quand, la
valeur calculée change, la classe `is-struck` rejoue une animation `strike` de
340 ms en `cubic-bezier(.2, .9, .25, 1)` : le chiffre arrive à 105,5 % d'échelle,
incliné de -1,1°, flou de 1,6 px et opacité .45, se pose à 55 % du parcours, puis
se stabilise. Le script mémorise la dernière valeur et ne rejoue rien si le total
n'a pas bougé. Sous `prefers-reduced-motion: reduce`, la règle globale ramène toute
animation et toute transition à .01 ms et rend le défilement instantané : la valeur
change alors sans coup de tampon, et rien d'autre n'est perdu.

Les hypothèses sont imprimées à côté du chiffre qu'elles produisent : la ligne
`.stub__note` réénonce le coût horaire, les semaines et le taux d'adoption retenus
à chaque recalcul.

### Statut du formulaire (`.status`)

Bloc de 2 px de bordure, pleine largeur du formulaire, `role="status"`. Le succès
prend le fond canari et la bordure d'encre ; l'échec prend la bordure et le texte
au rouge de tampon, sans fond. Les deux sont annoncés par un texte explicite, et
l'état d'un champ fautif est porté par l'épaisseur de sa bordure autant que par sa
couleur.

## Do's and Don'ts

### Do:

- **Do** teinter chaque encre secondaire depuis le feuillet qui la porte : un
  nouveau pli de couleur arrive avec son couple d'encres, comme
  `{colors.on-canari}` / `{colors.on-canari-2}` et `{colors.on-rose}` /
  `{colors.on-rose-2}`.
- **Do** réserver Courier Prime aux valeurs, aux chiffres et aux mesures, et leur
  donner des chiffres tabulaires.
- **Do** appliquer `text-shadow: .55px .55px 0 rgba(107, 104, 98, .3)` à toute
  valeur remplie, et rien qu'à elle.
- **Do** marquer un état par une marque — cadre incliné, croix, bordure épaissie —
  de sorte qu'aucune information ne repose sur la seule couleur.
- **Do** séparer deux régions de couleur par un `.perf`, en réglant
  `--perf-above` et `--perf-below` sur les deux plis en présence ; les couples déjà
  nommés sont `.perf--wc`, `--cw`, `--wr`, `--rw`, `--ci`, et tout autre couple se
  déclare en ligne sur l'élément, comme le fait la page de mentions légales.
- **Do** neutraliser `font-style` sur tout `<em>` composé en Archivo Black, et lui
  donner sa marque au tampon.
- **Do** donner 44 px de haut au minimum à toute cible tactile, et 48 px aux
  boutons et aux champs de saisie — les valeurs tenues par `.btn`, `.f input`,
  `.tick`, `.assump__toggle` et `.assump__body input`.
- **Do** escamoter un élément par `clip-path: inset(50%)` sur 1 px, ou par
  `transform`, comme le font `.vh`, `.pot`, `.lines thead` et `.skip`.
- **Do** théminer les surfaces qui ne sont pas dessinées : `::selection` inversée
  par feuillet, `caret-color` au rouge de tampon, `scrollbar-color` bleu de devis
  sur crème, `accent-color` au rouge de tampon, et `theme-color` au canari.
- **Do** garder un repère temporel ou une légende dans sa propre colonne, à côté du
  titre, comme `.exec__when`, y compris quand la grille se resserre.

### Don't:

- **Don't** écrire quoi que ce soit en gris sur un feuillet coloré.
- **Don't** écrire un titre, une phrase ou une valeur au bleu de devis : cette
  encre ne sert qu'au pré-imprimé et aux filets.
- **Don't** signaler un état par un simple changement de teinte.
- **Don't** introduire de carte, de panneau surélevé ou d'ombre portée : les cases
  du formulaire sont les seuls conteneurs, et le papier est plat.
- **Don't** arrondir un angle. Le système n'a qu'un seul jeton de forme, et il vaut
  zéro.
- **Don't** poser `{colors.rule-soft}` sous un texte ni sous la bordure d'une
  commande : à 2,08:1 sur le crème, cette encre n'est bonne que pour un filet
  décoratif. Un champ posé sur feuillet original doit recevoir un filet plus foncé.
- **Don't** écrire `white-space: nowrap` sur la première cellule d'un tableau : la
  désignation doit se couper librement, faute de quoi elle impose au tableau une
  largeur minimale — mesurée à 847 px ici — qui fait déborder toute la page.
- **Don't** escamoter par `left: -9999px` : ce décalage agrandit la largeur de
  défilement du document et crée un débordement horizontal sur tous les petits
  écrans.
- **Don't** se contenter de passer les lignes d'un tableau en grille pour le rendre
  responsive : l'élément `table` conserve sa disposition tabulaire et sa largeur
  minimale s'impose au conteneur. Il faut sortir `table`, `caption` et `tbody` du
  mode tableau, et rendre la sémantique par des rôles ARIA explicites.
- **Don't** descendre un champ de saisie sous `font-size: 1rem` : Safari iOS zoome
  de force à la mise au point.
- **Don't** abaisser les opacités de `.lines .desig span` (.78) et de `.scale`
  (.75) : ces deux textes atténués sont mesurés à 4,53:1 et 4,50:1 sur leur
  feuillet, c'est-à-dire exactement sur le seuil.
- **Don't** ajouter une seconde animation. La page en a une, et elle appartient au
  total.
