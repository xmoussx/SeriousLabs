#!/usr/bin/env bash
# Ferme ce que le VPS expose sans raison (audit du 29.10.2026).
# À lancer une fois, par Antoine : bash outils/securite-vps.sh
# Chaque fichier modifié est d'abord copié dans /var/backups/securite-<date>/.
set -euo pipefail

B=/var/backups/securite-$(date +%Y%m%d-%H%M%S)
sudo mkdir -p "$B"
sudo cp /etc/nginx/sites-available/adminer /etc/ssh/sshd_config.d/50-cloud-init.conf "$B/"
echo "Sauvegardes : $B"

# 1. Serveur de test oublié (python -m http.server 8191, copie de travail de
#    LEVELUM). Le site public, lui, est servi par nginx depuis /var/www/antidrones.
pkill -u ubuntu -f '^python3 -m http.server 8191$' || true

# 2. Adminer n'écoute plus que sur la machine. Pour s'en servir depuis le Mac :
#    ssh -L 8080:127.0.0.1:8080 ubuntu@51.68.227.107  puis  http://localhost:8080
sudo sed -i 's/^\s*listen 8080;/    listen 127.0.0.1:8080;/' /etc/nginx/sites-available/adminer
sudo nginx -t
sudo systemctl reload nginx

# 3. SSH par clé seulement : 42 000 essais de mot de passe dans les journaux,
#    et toutes les connexions réussies sont par clé. Le fichier 50-cloud-init
#    passe avant 60-cloudimg, c'est lui qui laissait les mots de passe ouverts.
sudo sed -i 's/^PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config.d/50-cloud-init.conf
sudo sshd -t
sudo systemctl reload ssh

# 4. Pare-feu : SSH, HTTP et HTTPS, rien d'autre. Ferme notamment le port 3000
#    (l'API AlphaDash reste joignable par https://api.seriouslabs.tech/api).
command -v ufw >/dev/null || sudo apt-get install -y ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

echo
sudo ufw status verbose
sudo sshd -T | grep -E '^passwordauthentication'
ss -tln | grep -E ':(8080|8191|3000) ' || true
echo "Terminé."
