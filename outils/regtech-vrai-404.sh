#!/usr/bin/env bash
# regtech.seriouslabs.tech renvoyait la page « Introuvable » avec un code 200 :
# une page retirée semblait toujours exister. Elle reçoit désormais un vrai 404.
# À lancer une fois, par Antoine : bash outils/regtech-vrai-404.sh
set -euo pipefail
CONF=$(grep -l 'server_name regtech.seriouslabs.tech' /etc/nginx/sites-enabled/*)
B=/var/backups/regtech-nginx-$(date +%Y%m%d-%H%M%S); sudo mkdir -p "$B"; sudo cp "$CONF" "$B/"
echo "Sauvegarde : $B"
sudo sed -i 's|try_files \$uri \$uri.html \$uri/ /404.html;|try_files $uri $uri.html $uri/ =404;|' "$CONF"
grep -q 'error_page 404' "$CONF" || sudo sed -i '0,/try_files \$uri \$uri.html \$uri\/ =404;/s||try_files $uri $uri.html $uri/ =404;\n        error_page 404 /404.html;|' "$CONF"
sudo nginx -t
sudo systemctl reload nginx
sleep 1
for p in /dossier-article /methode/strategie-anj / /cartographies/plan-caissier; do
  printf '%-28s %s\n' "$p" "$(curl -s -o /dev/null -w '%{http_code}' https://regtech.seriouslabs.tech$p)"
done
echo "Attendu : 404, 404, 200, 200."
