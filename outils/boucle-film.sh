#!/usr/bin/env bash
#
# Prépare un plan filmé pour le site à partir d'un rendu brut.
#
# Les modèles génèrent 5 secondes. Passé bout à bout, un plan de 5 s saute
# visiblement à chaque reprise. On concatène donc le plan et son inverse : la
# dernière image du premier est la première image du second, la boucle est
# continue et le fichier ne pèse pas plus lourd qu'un plan de 10 s ordinaire.
# C'est le procédé employé pour antidrones.seriouslabs.tech (242 images à
# 24 i/s, soit 2 × 121).
#
# Produit aussi le poster JPEG, qui n'est pas un accessoire : il porte seul le
# plan tant que le fichier n'est pas chargé, et définitivement lorsque le
# visiteur a demandé un mouvement réduit.
#
# Le quatrième argument règle l'équilibre des blancs, au format
# colorchannelmixer de ffmpeg. Les modèles rendent le papier légèrement froid
# alors que la page est crème chaud ; corriger ici plutôt qu'en filtre CSS
# évite de faire recalculer chaque image au navigateur.
#
# Usage : outils/boucle-film.sh brut.mp4 nom [largeur] [rr=..:gg=..:bb=..]

set -euo pipefail

BRUT="${1:?fichier source manquant}"
NOM="${2:?nom de sortie manquant}"
LARGEUR="${3:-960}"
BLANCS="${4:-}"

DEST="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/assets/video"
mkdir -p "$DEST"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# Mise à l'échelle sur une largeur paire, hauteur dérivée paire elle aussi :
# libx264 refuse les dimensions impaires.
FILTRE="scale=${LARGEUR}:-2,fps=24"
if [[ -n "$BLANCS" ]]; then
  FILTRE="colorchannelmixer=${BLANCS},${FILTRE}"
fi

ffmpeg -loglevel error -i "$BRUT" -an \
  -vf "$FILTRE" \
  -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p "$TMP/avant.mp4" -y

ffmpeg -loglevel error -i "$TMP/avant.mp4" -vf reverse -an \
  -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p "$TMP/arriere.mp4" -y

printf "file '%s'\nfile '%s'\n" "$TMP/avant.mp4" "$TMP/arriere.mp4" > "$TMP/liste.txt"

# -movflags +faststart : l'index passe en tête du fichier, la lecture démarre
# sans attendre le téléchargement complet.
ffmpeg -loglevel error -f concat -safe 0 -i "$TMP/liste.txt" -an \
  -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart \
  "$DEST/$NOM.mp4" -y

# Poster pris sur la première image, celle qui raccorde exactement avec le
# début de la boucle : aucun saut au démarrage de la lecture.
ffmpeg -loglevel error -i "$DEST/$NOM.mp4" -frames:v 1 -q:v 4 "$DEST/$NOM.jpg" -y

printf '%-12s %s\n' "$NOM.mp4" "$(du -h "$DEST/$NOM.mp4" | cut -f1)"
printf '%-12s %s\n' "$NOM.jpg" "$(du -h "$DEST/$NOM.jpg" | cut -f1)"
ffprobe -v error -select_streams v:0 \
  -show_entries stream=width,height,nb_frames,duration \
  -of default=nw=1 "$DEST/$NOM.mp4" | sed 's/^/  /'
