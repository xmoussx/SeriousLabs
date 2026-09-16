#!/usr/bin/env python3
"""Fabrique un plan filmé à partir d'une image fixe.

Il n'y a pas de mouvement dans le sujet : ce sont les gens qui restent
immobiles, et la caméra qui avance. C'est exactement ce que demandait le
prompt d'animation — « la caméra tient presque immobile, avec la plus légère
dérive vers l'avant » — à ceci près que personne ne respire.

Le recadrage est calculé en flottant puis rééchantillonné par Lanczos, ce qui
donne un déplacement sous-pixel réellement continu. Le filtre `zoompan` de
ffmpeg quantifie ses coordonnées et produit, à ces amplitudes-là, un
tremblement d'un pixel parfaitement visible sur un mur uni.

La boucle : 121 images en avant, puis les mêmes à l'envers. La dernière image
du premier brin est la première du second, la reprise est invisible. C'est le
procédé d'antidrones.seriouslabs.tech, 242 images à 24 i/s.
"""

import subprocess, sys, tempfile, shutil
from pathlib import Path
from PIL import Image

def anime(src, nom, largeur=1600, images=121, zoom=1.055, derive=0.0, dest=None):
    im = Image.open(src).convert('RGB')
    W, H = im.size
    # libx264 refuse les dimensions impaires : 1200 de large donne 675, qui
    # casse l'encodage. On arrondit les deux côtés au pair inférieur.
    largeur -= largeur % 2
    hauteur = round(largeur * 9 / 16)
    hauteur -= hauteur % 2
    tmp = Path(tempfile.mkdtemp())
    try:
        for i in range(images):
            t = i / (images - 1)
            # Détente exponentielle : la caméra décélère en fin de course, ce
            # qui rend le mouvement organique plutôt que mécanique.
            e = 1 - pow(2, -9 * t)
            z = 1 + (zoom - 1) * e
            cw, ch = W / z, H / z
            # Dérive horizontale, en fraction de la marge disponible.
            marge = (W - cw) / 2
            cx = (W - cw) / 2 + derive * marge * e
            cy = (H - ch) / 2
            im.resize((largeur, hauteur), Image.LANCZOS,
                      box=(cx, cy, cx + cw, cy + ch)).save(tmp / f'{i:04d}.png')

        av = tmp / 'avant.mp4'
        subprocess.run(['ffmpeg','-loglevel','error','-framerate','24',
                        '-i', str(tmp/'%04d.png'), '-c:v','libx264','-crf','24',
                        '-preset','slow','-pix_fmt','yuv420p', str(av), '-y'], check=True)
        ar = tmp / 'arriere.mp4'
        subprocess.run(['ffmpeg','-loglevel','error','-i',str(av),'-vf','reverse',
                        '-c:v','libx264','-crf','24','-preset','slow',
                        '-pix_fmt','yuv420p', str(ar), '-y'], check=True)
        liste = tmp / 'liste.txt'
        liste.write_text(f"file '{av}'\nfile '{ar}'\n")

        dest = Path(dest or 'assets/video')
        dest.mkdir(parents=True, exist_ok=True)
        out = dest / f'{nom}.mp4'
        # +faststart : l'index passe en tête, la lecture démarre sans attendre
        # le téléchargement complet.
        subprocess.run(['ffmpeg','-loglevel','error','-f','concat','-safe','0',
                        '-i',str(liste),'-an','-c:v','libx264','-crf','24',
                        '-preset','slow','-pix_fmt','yuv420p',
                        '-movflags','+faststart', str(out), '-y'], check=True)
        poster = dest / f'{nom}.jpg'
        Image.open(tmp/'0000.png').save(poster, quality=76, optimize=True, progressive=True)
        return out, poster
    finally:
        shutil.rmtree(tmp)

if __name__ == '__main__':
    src, nom = sys.argv[1], sys.argv[2]
    largeur = int(sys.argv[3]) if len(sys.argv) > 3 else 1600
    zoom    = float(sys.argv[4]) if len(sys.argv) > 4 else 1.055
    derive  = float(sys.argv[5]) if len(sys.argv) > 5 else 0.0
    out, poster = anime(src, nom, largeur, zoom=zoom, derive=derive)
    for p in (out, poster):
        print(f'  {p.name:16} {p.stat().st_size//1024} Ko')
