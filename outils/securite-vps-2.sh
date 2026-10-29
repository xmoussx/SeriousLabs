#!/usr/bin/env bash
# Suite de securite-vps.sh (29.10.2026) : le pare-feu gardait d'anciennes
# règles ouvrant 8080, 3000, 7350 et 7351, et le rechargement de nginx avait
# laissé Adminer écouter sur toutes les adresses.
# À lancer une fois, par Antoine : bash outils/securite-vps-2.sh
set -euo pipefail

# 8080 : Adminer, désormais local. 3000 : l'API AlphaDash, servie par nginx
# (api.seriouslabs.tech). 7350 et 7351 : plus rien n'écoute dessus.
for r in 8080 3000 7350/tcp 7351/tcp; do sudo ufw delete allow "$r" || true; done

# Un redémarrage, pas un rechargement : seul il referme l'ancienne écoute.
sudo nginx -t
sudo systemctl restart nginx

echo
sudo ufw status
ss -tln | grep -E ':(8080|3000) ' || true
echo "Terminé."
