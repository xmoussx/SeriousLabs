---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["en/index.html"]
---

## Direction contract

THESIS: La page EST le carnet à souche de devis, l'objet que tout artisan et
tout cabinet français remplit à la main. Elle refuse les deux arrangements de
la catégorie : le bandeau sombre à dégradé de l'IA, et la page suisse blanche à
filets d'un pixel et sur-titres numérotés — c'est-à-dire précisément ce que ce
site était encore hier.

OWN-WORLD: Trois feuillets autocopiants occupent des régions entières, bord à
bord : original #FCFBF7, jaune canari #F0D24B, rose carbone #EFB8C0, séparés
par de vraies perforations percées et non par des bordures pointillées. Le
pré-imprimé du formulaire est en bleu de devis #2C5AA0 : champs encadrés,
intitulés en capitales Archivo à 11px, filets de cellules, numéro de liasse en
coin. Les valeurs remplies sont du carbone dactylographié — Courier Prime,
légèrement hors registre, encre #16181A. L'état est un tampon #8E2340 posé de
travers d'un degré, jamais un changement de teinte. Aucune carte : les cases du
formulaire sont les seuls conteneurs.

STORY: Le visiteur reconnaît l'objet avant d'avoir lu un mot, comprend que ce
sont les heures autour du métier qui lui coûtent, voit son propre chiffre
calculé dans les cases du carnet avec chaque hypothèse imprimée à côté, et
écrit.

FIRST VIEWPORT: Feuillet original plein cadre. L'en-tête pré-imprimé du carnet
court bord à bord : la fiole et SERIOUS LABS à gauche, à droite le bloc de
référence encadré (numéro, date, mention « exemplaire client »). Dessous,
l'énoncé est écrit DANS le plus grand champ du formulaire, en Archivo Black à
clamp(2.6rem, 6.4vw, 5.4rem), sa seconde ligne tamponnée. À sa droite un
panneau « conditions » encadré portant l'offre en paires intitulé/valeur.
L'action principale est celle du carnet : un bloc tamponné en bas à droite du
feuillet. Une perforation ferme la fenêtre, le feuillet canari affleurant
dessous.

EXCEPTIONS À LA PROMESSE CI-DESSUS — consignées, non réécrites, chacune avec sa
raison et sa mesure :

1. Numéro de liasse : NON CONSTRUIT. Un numéro inventé sur un site commercial se
   lit comme une référence de devis réelle, et PRODUCT.md interdit d'inventer
   toute donnée factuelle. Le bloc porte donc « établi le », « exemplaire » et
   « validité », qui sont vrais. La promesse reste écrite telle quelle ci-dessus
   pour que l'écart reste visible.

2. Échelle de l'énoncé : clamp(2.2rem, 5.3vw, 4.5rem) au lieu de
   clamp(2.6rem, 6.4vw, 5.4rem). Mesure à 1440x900 : à la grande échelle, le bas
   de l'action principale tombait à 1150 px, hors fenêtre. À l'échelle retenue,
   le bandeau finit à 210 px et l'action à 816 px en français, 747 px en anglais.

3. Position de l'action : en bas à gauche de la colonne de l'énoncé, et non en
   bas à droite du feuillet. Le panneau « conditions » occupe la droite ; y
   placer aussi l'action séparerait le geste de la phrase qui le motive.

4. Perforation fermant la fenêtre : NON TENUE DE FAÇON FIABLE, dans les deux
   langues. Mesure de la position haute de la première perforation selon la
   hauteur de fenêtre réelle, barre du navigateur déduite :
     1920x1080 bureau (955 px utiles) : FR 930 dedans, EN 861 dedans
     1536x864 portable 1080p           : FR 930 dehors, EN 861 dedans
     1440x900 conservateur             : FR 927 dehors, EN 858 dedans
     1440x900 macOS (789 px utiles)    : FR 927 dehors, EN 858 dehors
   La promesse ne tient donc qu'au-delà d'environ 935 px utiles en anglais et
   960 px en français, c'est-à-dire sur un écran de bureau et pas sur un
   portable. Une consignation antérieure disait « tenue en anglais » : elle
   reposait sur la seule hauteur de test de 900 px et était trop flatteuse.

   Ce qui a été fait sans toucher à la copie : premier feuillet doté de sa
   propre respiration resserrée, interlignage de l'énoncé à .96. Fermer
   réellement la fenêtre sur un portable supposerait de retirer l'action
   secondaire ou de raccourcir l'énoncé, donc de payer la promesse en contenu.

   Le signal du carnet, lui, ne dépend pas de cette perforation : le bandeau
   pré-imprimé finit à 210 px et reste visible sur toutes les hauteurs
   mesurées. C'est lui qui remplit la promesse de STORY — reconnaître l'objet
   avant d'avoir lu un mot.

FORM: Le carnet à souche — candidat 1 de ma liste, choisi par l'utilisateur
contre le candidat 7 que le tirage avait assigné. Clé de tirage 49a0b518.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
