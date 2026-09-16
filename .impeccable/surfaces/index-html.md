---
version: 2
slug: "index-html"
primary_target: "index.html"
related_targets: ["en/index.html", "mentions-legales.html", "en/legal.html"]
---

## Direction contract

THESIS: La page EST l'emploi du temps de la journée vendue. Le produit est une
journée ; le site est donc bâti sur du temps, pas sur des arguments. Elle
refuse trois arrangements : le bandeau sombre à dégradé de l'IA, la grille de
cartes à ombre portée, et l'imprimé administratif dense de la version
précédente.

OWN-WORLD: Blanc #FFFFFF. Une colonne de moments descend le long de la page,
une règle verticale #E6E8EC la longe sans interruption, et chaque chose dite
est accrochée à un moment. Un seul accent, le vermillon #D92B00, réservé à
l'action, au repère de temps et au signal — jamais décoratif ; sa variante
éclaircie #EF5A33 le remplace sur fond d'encre, où le premier tombe sous le
seuil. Aucune carte, aucune ombre d'élévation, aucun rayon de bordure : la
profondeur se fait par pleine largeur d'encre #101114. Archivo Black très
serré pour les titres, Archivo pour la prose, chiffres tabulaires pour toute
valeur qui doit s'aligner.

STORY: Le visiteur voit d'abord ce qu'il achète — une journée, quatre
personnes, chez lui, tarif sur devis — puis la journée heure par heure, puis
ce qui lui coûte des heures, puis la limite de ce que l'outil fait, puis
comment ça entre dans son budget formation, et il écrit.

FIRST VIEWPORT: Entête collante à filet simple. Sur-titre vermillon en
capitales, énoncé en Archivo Black à clamp(2.3rem, 6.4vw, 4.75rem) sur trois
lignes, lede de trois phrases, action vermillon pleine. Sous l'action, les
cinq faits de l'offre en paires intitulé/valeur séparées par un filet d'un
pixel, jamais encadrées.

## Décisions à ne pas défaire

- **Le carnet à souche est abandonné.** Il avait dérivé de la demande d'origine
  — ultra moderne, hyper dépouillé — vers un imprimé rétro et dense, et il
  déguisait en paperasse un service qui vend la sortie de la paperasse. Ne pas
  le réintroduire.
- **Aucun plan filmé.** Une tentative a été faite et retirée. Filmer une
  intervention serait une preuve fabriquée tant qu'aucune n'a eu lieu.
- **Aucun calculateur.**
- **Quatre participants au maximum.** Toute formulation du type « toute
  l'équipe formée en même temps » contredit cette limite.

## Contraintes d'écriture

Titres : proscrire les tournures creuses qui annoncent au lieu de dire — « Ce
que… », « Pourquoi… », « Comment… », « Notre approche de… ». Un titre nomme son
objet ou énonce un fait. Phrases déclaratives, pas d'antithèse binaire, pas de
phrase à chute, pas de formule sentencieuse. Aucune performance non mesurée ne
peut être annoncée.

## Contrôles chiffrés à repasser après toute modification

| Contrôle | Seuil | Méthode |
|---|---|---|
| Débordement horizontal | `scrollWidth <= viewport` de 320 à 1920 px | Playwright, les quatre pages |
| Contraste du texte | AA : 4,5 / 3,0 en gros | Calcul sur les couleurs effectivement calculées, pas sur les jetons |
| Cibles tactiles | 44 px de haut | Exemptions : lien d'évitement découpé, liens en ligne dans une phrase, case à cocher dont le libellé entier est cliquable |
| Erreurs console | zéro | |
| Formulaire | envoi réel abouti | Attendre plus de 3 s : en deçà le serveur classe l'envoi comme robotique |

## EXCEPTIONS

**La barre de durée est conservée malgré `side-tab`.** Le détecteur signale
`.dur::after` comme un bandeau décoratif de 3 px. Il ne l'est pas : sa longueur
est proportionnelle à la durée qu'elle accompagne — 0,214 pour 45 minutes
contre 1 pour 3 h 30 — et c'est la seule donnée du site qui soit représentée
plutôt qu'écrite. L'interdit du plancher vise les bordures de flanc colorées
sur des cartes et des encarts, pas une marque de donnée dans un tableau.

**L'interlignage de l'affichage reste sous 1,3.** Le détecteur applique un
seuil de lisibilité de corps de texte à des titres de 48 à 76 px, où un
interlignage serré est au contraire ce qu'il faut.

**Les constats `cramped-padding` et `low-contrast` sont des faux positifs.**
Vérifiés en navigateur le 16.09.2026 : les six « texte noir sur fond sombre »
visent `<html>`, `<head>` et `<title>` ; vingt et un des vingt-deux
« cramped-padding » visent des sections qui portent bien leur `padding-block`.
Le vingt-deuxième était réel — la moitié sombre du bandeau — et a été corrigé.
