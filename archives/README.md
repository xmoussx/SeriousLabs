# Archives

Documents déposés au fil du temps à la racine de ce dépôt, sans rapport avec le
site seriouslabs.tech : articles, études de production, propositions
commerciales, bibles de projets.

Ils ont été rangés ici le 12 septembre 2026, lors de la refonte du site. Aucun
n'a été supprimé, et `git log --follow` retrouve leur historique complet.

Ce dossier **n'est pas déployé** : `deploy.sh` ne copie vers `/var/www` que les
entrées qui composent réellement le site.

## Trois fichiers à ne pas supprimer sans vérifier

- `privacy-policy.html` et `delete-account.html` — ce sont typiquement les
  pages exigées par les stores pour une application mobile. Vérifier ce que
  pointent les fiches Alphadash avant d'y toucher.
- `googleb56e9726ff2adfff.html` — vérification de propriété Google Search
  Console. Un fichier de ce type ne prouve la propriété que s'il est servi à la
  racine du domaine. GitHub Pages étant désactivé sur ce dépôt, il ne l'est pas
  d'ici.

## Point de vigilance après la bascule DNS

Si la propriété de seriouslabs.tech dans Search Console repose sur un fichier
servi par l'ancien hébergement OVH, elle sautera au moment où le domaine
pointera vers le VPS. La parade est de basculer la vérification sur un
enregistrement DNS TXT, qui ne dépend plus de l'hébergement.
