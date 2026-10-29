#!/usr/bin/env bash
# Retire board.seriouslabs-consulting.com, le tableau d'une seule réunion de
# rédaction Les Enjeux (26.03.2026). Les 32 notes sont archivées dans
# ~/archives/board-reunion-2026-03-26.json ; le code reste dans ~/board-reunion-v2.
# À lancer une fois, par Antoine : bash outils/retire-board.sh
set -euo pipefail

B=/var/backups/board-retire-$(date +%Y%m%d-%H%M%S)
sudo mkdir -p "$B"
sudo cp /etc/nginx/sites-enabled/board-reunion /etc/nginx/board.htpasswd "$B/"
sudo -u postgres pg_dump board_reunion | sudo tee "$B/board_reunion.sql" >/dev/null
echo "Sauvegarde : $B"

sudo rm /etc/nginx/sites-enabled/board-reunion /etc/nginx/board.htpasswd
sudo nginx -t
sudo systemctl reload nginx

sudo certbot delete --non-interactive --cert-name board.seriouslabs-consulting.com
sudo -u postgres psql -qc 'DROP DATABASE board_reunion' -c 'DROP ROLE board_user'

echo "Terminé."
