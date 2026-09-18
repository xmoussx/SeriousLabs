#!/usr/bin/env bash
#
# Monte un plan brut généré en plan prêt pour le site.
#
# Le modèle local sort 3 secondes au maximum. Passé bout à bout, un plan de 3 s
# saute visiblement à chaque reprise. On concatène donc le plan et son inverse :
# la dernière image du premier est la première du second, la boucle est
# continue. C'est le procédé d'antidrones.seriouslabs.tech.
#
# Le poster n'est pas un accessoire : il porte seul le plan tant que le fichier
# n'est pas chargé, et définitivement lorsque le visiteur a demandé un mouvement
# réduit.
#
# Usage : outils/monte-plan.sh brut.mp4 nom [largeur]

set -euo pipefail
BRUT="${1:?fichier source manquant}"
NOM="${2:?nom de sortie manquant}"
LARGEUR="${3:-}"

DEST="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/assets/video"
mkdir -p "$DEST"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT

# Sans redimensionnement demandé, on garde la définition native : agrandir ici
# ne ferait qu'alourdir le fichier sans ajouter un détail.
if [[ -n "$LARGEUR" ]]; then
  ECHELLE="scale=${LARGEUR}:-2,"
else
  ECHELLE=""
fi

ffmpeg -loglevel error -i "$BRUT" -an -vf "${ECHELLE}fps=24" \
  -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p "$TMP/avant.mp4" -y
ffmpeg -loglevel error -i "$TMP/avant.mp4" -vf reverse -an \
  -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p "$TMP/arriere.mp4" -y
printf "file '%s'\nfile '%s'\n" "$TMP/avant.mp4" "$TMP/arriere.mp4" > "$TMP/liste.txt"
ffmpeg -loglevel error -f concat -safe 0 -i "$TMP/liste.txt" -an \
  -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart \
  "$DEST/$NOM.mp4" -y
ffmpeg -loglevel error -i "$DEST/$NOM.mp4" -frames:v 1 -q:v 4 "$DEST/$NOM.jpg" -y

printf '  %-14s %s Ko\n' "$NOM.mp4" "$(( $(stat -c%s "$DEST/$NOM.mp4") / 1024 ))"
printf '  %-14s %s Ko\n' "$NOM.jpg" "$(( $(stat -c%s "$DEST/$NOM.jpg") / 1024 ))"
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,nb_frames \
  -show_entries format=duration -of default=nw=1 "$DEST/$NOM.mp4" | sed 's/^/    /'
