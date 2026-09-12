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

## Le fichier de vérification Google n'est plus ici

`googleb56e9726ff2adfff.html` a été remis à la racine du dépôt et ajouté à la
liste de `deploy.sh` : un fichier de ce type ne prouve la propriété du domaine
que s'il est réellement servi à la racine du site.

Constat du 12 septembre 2026 : il répondait 404 sur l'ancien hébergement et
aucun enregistrement `google-site-verification` n'existait dans la zone. La
propriété n'était donc plus vérifiée du tout. Le fichier redeviendra effectif
dès que le domaine pointera vers le VPS.

La vérification par enregistrement TXT reste préférable : elle couvre l'apex et
tous les sous-domaines d'un coup, et ne dépend d'aucun hébergement.
