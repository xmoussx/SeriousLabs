# Design — Serious Labs

Monde visuel : **« La journée », en sombre**. Cette note remplace celle du
carnet à souche, abandonné le 16 septembre 2026.

Le passage au sombre date du 18 septembre 2026. Le client a choisi cette
direction parmi trois premiers écrans construits et présentés côte à côte, après
avoir rejeté deux versions claires. Le décalage tenait à ça depuis le début : il
admirait antidrones.seriouslabs.tech, qui est sombre et cinématographique,
pendant qu'on lui construisait des pages blanches.

La structure n'a pas changé — l'emploi du temps de la journée, la colonne de
moments, la table du programme, les bandeaux à média. Seul le monde a changé.

## Pourquoi ce monde

Le produit vendu est une journée. Le site est donc bâti sur du temps plutôt que
sur des arguments : une colonne de moments descend le long de la page, une règle
verticale la longe sans interruption, et chaque chose dite est accrochée à un
moment.

Il refuse trois arrangements :

1. le bandeau sombre à dégradé, signature de la catégorie IA ;
2. la grille de cartes à ombre portée ;
3. l'imprimé administratif dense de la version précédente.

Le carnet à souche était une idée forte mais il portait deux défauts. Il avait
dérivé de la demande d'origine — ultra moderne, hyper dépouillé — vers du rétro
et du dense. Et il déguisait en paperasse un service qui vend la sortie de la
paperasse.

## Couleurs

Chaque valeur est donnée avec son rapport de contraste réel, pas avec une
intention.

| Jeton | Valeur | Rôle | Contraste |
|---|---|---|---|
| `--page` | `#07090b` | le fond, désormais l'encre | — |
| `--ink` | `#eef1f4` | texte principal | 17,59:1 sur le fond |
| `--ink-2` | `#9fa9b3` | texte secondaire | 8,36:1 |
| `--rule` | `#1b2026` | filets | 1,22:1 — décoratif, ne porte jamais d'information |
| `--accent` | `#ff5c2b` | action, repère de temps, signal | 6,47:1 sur le fond, et 6,47:1 en noir dessus |
| `--surface` | `#151c25` | panneaux de texte | 1,16:1 d'écart avec le fond |
| `--on-ink` | `#7f8b96` | plancher du texte secondaire sur surface | 5,73:1 |
| `--rule-ink` | `#242c36` | filets sur surface | — |

**L'accent reste le vermillon, pas le cyan de LEVELUM.** C'est déjà la couleur de
la marque ; lui emprunter le sien ferait de ce site une copie au lieu d'une
famille. Éclairci de `#D92B00` à `#FF5C2B`, ce qui le fait passer de 4,08:1 à
6,47:1 sur le fond.

`#6b7680` a été écarté comme plancher de texte secondaire : mesuré à 4,30:1, il
échoue au seuil de 4,5. Le plancher est `#7f8b96`.

L'écart de la surface au fond est tenu à 1,16:1, la même valeur
qu'antidrones.seriouslabs.tech : assez pour séparer un panneau, trop peu pour le
découper.

## Typographie

Archivo Black pour les titres, Archivo 400/500/600/700 pour la prose et les
intitulés. Aucune autre famille. Courier Prime a été retiré avec le carnet :
les valeurs qui doivent s'aligner passent par `font-variant-numeric:
tabular-nums`, ce qui donne le même alignement et une police de moins à
télécharger — 63 Ko économisés.

Archivo Black n'a pas d'italique. Toute emphase dans un titre se fait au trait
(`box-shadow: inset 0 -.14em 0`), jamais par `font-style: italic`, qui serait
synthétisée et penchée par le navigateur.

## Règles du système, sans exception

- Aucune carte, aucune ombre d'élévation, aucun rayon de bordure.
- Une seule couleur d'accent, jamais décorative.
- La profondeur se fait par pleine largeur d'encre, pas par empilement.
- Les valeurs chiffrées sont tabulaires.

## Deux pièges de spécificité, tous deux rencontrés

`.nav a` vaut 0,1,1 et l'emporte sur `.cta` à 0,1,0 : sans `.nav .cta`, le texte
de l'action dans l'entête prenait le gris de navigation sur son aplat vermillon,
soit **1,26:1**. Le défaut ne se voit pas à l'œil.

`.form label` vaut 0,1,1 et l'emporte sur `.consent` à 0,1,0 : toute la phrase
de consentement partait en capitales. Corrigé par `.form .consent`.

Conclusion pratique : dans cette feuille, une règle qui corrige un héritage doit
être au moins aussi spécifique que celle qui le cause, et le contraste se
vérifie sur les couleurs **calculées**, pas sur les jetons.

## Structure de la page

1. **Ouverture** — sur-titre, énoncé, lede, action, cinq faits de l'offre.
2. **La journée** — la colonne de moments. Quatre moments : avant, matin,
   après-midi, trente jours après.
3. **Où passent vos heures** — huit postes en liste numérotée, pas en cartes :
   ils sont de même nature et de même poids.
4. **La ligne** — pleine largeur d'encre. L'affirmation qu'aucun document ne
   sort sans relecture humaine, puis trois colonnes : préparation, décision,
   propriété.
5. **Budget formation** — avec l'aveu que Qualiopi n'est pas obtenue.
6. **Demande** — le formulaire.
7. **Pied de page** — pleine largeur d'encre.

Les pages de mentions légales partagent l'entête, le pied et `.doc`.

## Sécurité, conséquence d'une décision de design

Plus aucun script ni style en ligne dans les quatre pages : l'horodatage
anti-robot est posé par `app.js` et non par une balise `<script>` en fin de
page. La directive `script-src` de la CSP est donc passée de
`'self' 'unsafe-inline'` à `'self'`.


## Deux défauts que la mesure de contraste ne voit pas

Le passage au sombre en a produit deux, qu'aucun calcul automatique ne
signalait, parce qu'ils ne portent pas sur du texte.

**Le logo devenait invisible.** Son tracé porte sa couleur en dur — `#16181a` —
parce qu'il a été vectorisé depuis le fichier d'origine du client et que ses
contours ne se retouchent pas. Servi par une balise `<img>`, aucune règle CSS ne
peut l'atteindre. Il est donc inversé par `filter: invert(1)` : monochrome, il
devient exactement aussi clair qu'il était sombre, sans que le fichier bouge.

**Le bouton d'arrêt du plan portait du texte noir sur un voile noir.** Sa
couleur était `var(--page)`, qui désignait le blanc et désigne désormais le
fond. Tout jeton employé à l'envers d'un monde se retourne avec lui.
