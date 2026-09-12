#!/usr/bin/env bash
#
# Déploiement de seriouslabs.tech vers /var/www/seriouslabs.
#
# Le dépôt contient aussi 45 fichiers hérités sans rapport avec le site
# (articles, études, privacy-policy.html et delete-account.html utilisés par
# les stores, vérification Google Search Console). Ils sont conservés dans le
# dépôt mais ne doivent JAMAIS partir en ligne — d'où la liste explicite
# ci-dessous plutôt qu'un rsync du dossier entier.
#
# Usage : ./deploy.sh

set -euo pipefail

SOURCE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET="/var/www/seriouslabs"

# Tout ce qui compose le site, et rien d'autre.
CONTENU=(
  index.html
  mentions-legales.html
  robots.txt
  sitemap.xml
  assets
  en
  api
)

for item in "${CONTENU[@]}"; do
  if [[ ! -e "$SOURCE/$item" ]]; then
    echo "Manquant : $item — déploiement interrompu." >&2
    exit 1
  fi
done

echo "Déploiement de $SOURCE vers $TARGET"

sudo mkdir -p "$TARGET"

# --delete purge ce qui n'est plus dans la liste, y compris un fichier hérité
# qui s'y serait glissé lors d'un déploiement précédent.
sudo rsync -a --delete \
  --exclude '.env' \
  "${CONTENU[@]/#/$SOURCE/}" "$TARGET/"

sudo chown -R www-data:www-data "$TARGET"
sudo find "$TARGET" -type d -exec chmod 755 {} +
sudo find "$TARGET" -type f -exec chmod 644 {} +

sudo nginx -t
sudo systemctl reload nginx

echo "Déployé. Vérification :"
for chemin in / /en/ /mentions-legales.html /en/legal.html /robots.txt /sitemap.xml; do
  code=$(curl -s -o /dev/null -w '%{http_code}' -H 'Host: seriouslabs.tech' "http://127.0.0.1$chemin")
  printf '  %-26s %s\n' "$chemin" "$code"
done
