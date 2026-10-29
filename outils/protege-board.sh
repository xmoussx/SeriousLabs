#!/usr/bin/env bash
# Met un mot de passe partagé devant board.seriouslabs-consulting.com, qui
# laissait n'importe qui lire les notes ou les effacer toutes (29.10.2026).
# À lancer une fois, par Antoine : bash outils/protege-board.sh
# Identifiant : lesenjeux. Le mot de passe est tiré au hasard et affiché à la fin.
set -euo pipefail

CONF=/etc/nginx/sites-enabled/board-reunion
PASS=/etc/nginx/board.htpasswd

B=/var/backups/board-$(date +%Y%m%d-%H%M%S)
sudo mkdir -p "$B"
sudo cp "$CONF" "$B/"
echo "Sauvegarde : $B"

mdp=$(openssl rand -base64 18 | tr -d '/+=' | cut -c1-16)
printf 'lesenjeux:%s\n' "$(openssl passwd -apr1 "$mdp")" | sudo tee "$PASS" >/dev/null
sudo chown root:www-data "$PASS"
sudo chmod 640 "$PASS"

if ! sudo grep -q auth_basic "$CONF"; then
  sudo sed -i '0,/location \/ {/s//location \/ {\n        auth_basic "Board Les Enjeux";\n        auth_basic_user_file \/etc\/nginx\/board.htpasswd;/' "$CONF"
fi

sudo nginx -t
sudo systemctl reload nginx

echo
echo "Sans mot de passe : $(curl -s -o /dev/null -w '%{http_code}' https://board.seriouslabs-consulting.com/) (attendu 401)"
echo "Avec              : $(curl -s -o /dev/null -w '%{http_code}' -u "lesenjeux:$mdp" https://board.seriouslabs-consulting.com/) (attendu 200)"
echo
echo "Identifiant : lesenjeux"
echo "Mot de passe : $mdp"
