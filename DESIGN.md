# Design — Serious Labs

Monde visuel : **« La journée »**. Cette note remplace celle du carnet à souche,
abandonné le 16 septembre 2026.

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
| `--page` | `#ffffff` | fond | — |
| `--ink` | `#101114` | texte, et fond des sections pleines | 18,88:1 sur la page |
| `--ink-2` | `#5c626b` | texte secondaire | 6,15:1 |
| `--rule` | `#e6e8ec` | filets | 1,23:1 — décoratif, ne porte jamais d'information |
| `--accent` | `#d92b00` | action, repère de temps, signal | 4,89:1 sur blanc, et 4,89:1 en blanc dessus |
| `--accent-ink` | `#ef5a33` | le même rôle, mais sur fond d'encre | 5,56:1 sur `--ink` |
| `--on-ink` | `#b9bfc7` | texte secondaire sur l'encre | 8,1:1 |
| `--rule-ink` | `#2a2d33` | filets sur l'encre | — |

`--accent` tombe à 3,86:1 sur `--ink` : suffisant pour un aplat, insuffisant
pour du texte de 12 px. D'où `--accent-ink`. La faute a été commise puis
mesurée puis corrigée ; elle est notée ici pour ne pas être refaite.

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
