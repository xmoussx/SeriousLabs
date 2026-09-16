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
  # Vérification de propriété Google Search Console par fichier. Elle n'a
  # d'effet que servie à la racine du domaine, d'où sa présence ici plutôt
  # que dans archives/. À conserver tant que la propriété « Préfixe d'URL »
  # existe côté Google ; la propriété « Domaine » se vérifie par TXT et ne
  # dépend pas de ce fichier.
  googleb56e9726ff2adfff.html
)

for item in "${CONTENU[@]}"; do
  if [[ ! -e "$SOURCE/$item" ]]; then
    echo "Manquant : $item — déploiement interrompu." >&2
    exit 1
  fi
done

# Sauvegarde de la version en ligne avant de la remplacer : sans elle, un
# déploiement fautif ne se rattrape qu'en reconstruisant depuis le dépôt.
if [[ -d "$TARGET" ]]; then
  SAUVE="/var/backups/seriouslabs"
  sudo mkdir -p "$SAUVE"
  HORO="$(date +%Y%m%d-%H%M%S)"
  sudo tar czf "$SAUVE/site-$HORO.tar.gz" -C "$TARGET" . 2>/dev/null \
    && echo "Sauvegarde : $SAUVE/site-$HORO.tar.gz"
  # On garde les dix dernières.
  sudo sh -c "ls -1t '$SAUVE'/site-*.tar.gz 2>/dev/null | tail -n +11 | xargs -r rm -f"
fi

echo "Déploiement de $SOURCE vers $TARGET"

sudo mkdir -p "$TARGET"

# On monte d'abord l'arborescence exacte voulue dans un répertoire temporaire,
# puis on synchronise ce répertoire avec --delete. Passer directement une liste
# de sources à rsync ne purgerait PAS les fichiers isolés déjà présents à la
# racine de la cible : rsync ne considère alors pas la cible comme le miroir
# d'une source unique. D'où l'étape intermédiaire.
STAGING="$(mktemp -d)"
trap 'rm -rf "$STAGING"' EXIT

for item in "${CONTENU[@]}"; do
  cp -a "$SOURCE/$item" "$STAGING/"
done
rm -f "$STAGING/.env"

sudo rsync -a --delete "$STAGING/" "$TARGET/"

sudo chown -R www-data:www-data "$TARGET"
sudo find "$TARGET" -type d -exec chmod 755 {} +
sudo find "$TARGET" -type f -exec chmod 644 {} +

sudo nginx -t
sudo systemctl reload nginx

echo "Déployé. Vérification :"
for chemin in / /en/ /mentions-legales.html /en/legal.html /robots.txt /sitemap.xml \
              /googleb56e9726ff2adfff.html /assets/img/logo.svg \
              /assets/img/favicon.svg /assets/img/og-fr.png /assets/img/og-en.png \
              /assets/img/atelier-1600.jpg /assets/img/atelier-960.jpg; do
  # En HTTPS : depuis la bascule, HTTP renvoie un 301 et masquerait une page
  # réellement cassée derrière un code de redirection.
  code=$(curl -sk -o /dev/null -w '%{http_code}' \
           --resolve seriouslabs.tech:443:127.0.0.1 "https://seriouslabs.tech$chemin")
  printf '  %-26s %s\n' "$chemin" "$code"
done
