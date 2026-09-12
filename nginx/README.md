# Configuration nginx

`seriouslabs.tech.conf` est la copie versionnée de
`/etc/nginx/sites-available/seriouslabs.tech` sur le VPS.

Ce dossier n'est **pas** déployé : `deploy.sh` ne copie vers `/var/www` que les
entrées du site. Après modification, installer à la main :

```sh
sudo cp nginx/seriouslabs.tech.conf /etc/nginx/sites-available/seriouslabs.tech
sudo nginx -t && sudo systemctl reload nginx
```

## Deux pièges rencontrés, à ne pas réintroduire

**`add_header` dans un `location` annule tout l'héritage.** Un seul
`add_header` dans un bloc `location` supprime la totalité des `add_header`
définis au niveau `server` — pas seulement celui du même nom. C'est pour ça que
la mise en cache utilise la directive `expires` (`expires 30d`, `expires -1`)
et non `add_header Cache-Control` : `expires` n'a pas cet effet de bord. Sans
cette précaution, CSP, HSTS et les autres en-têtes de sécurité disparaissent
silencieusement de toutes les pages.

**`http2 on;` n'existe pas avant nginx 1.25.** Le VPS tourne en 1.18 : la forme
correcte est `listen 443 ssl http2;`.

## Choix assumés sur HSTS

`max-age=31536000`, sans `includeSubDomains` ni `preload`.

Pas de `includeSubDomains` parce que les sept sous-domaines hébergent des
projets en cours : un nouveau sous-domaine servi en HTTP simple deviendrait
injoignable dans les navigateurs ayant déjà vu l'en-tête. Pas de `preload`
parce que l'inscription aux listes intégrées aux navigateurs met des mois à se
défaire.
