# Les travellings écartés

Ces quatre fichiers sont les plans qui étaient en ligne jusqu'au 18 septembre
2026 : des travellings calculés sur les images fixes par `outils/plan-anime.py`,
sans aucun modèle génératif.

Ils ont été remplacés par des plans animés en image vers vidéo sur le Mac du
client, à sa demande explicite et après qu'il a vu le défaut. Ce qu'on gagne :
la scène bouge réellement, 54 % de pixels actifs contre un simple recadrage.
Ce qu'on perd, mesuré :

- définition, 1600 × 900 et 1200 × 674 deviennent 1024 × 576 ;
- longueur de boucle, 10 secondes deviennent 3,4 ;
- les mains. La main qui pointe perd ses doigts en une demi-seconde et devient
  une forme lisse ; celles posées sur les claviers deviennent des blocs. Les
  visages, eux, tiennent parfaitement.

Augmenter la définition aggrave le défaut plutôt que de le corriger : à
1280 × 704, un avant-bras entier disparaît à l'image 27.

Pour revenir en arrière :

    cp assets/video/travellings-ecartes/*.mp4 assets/video/
    cp assets/video/travellings-ecartes/*.jpg assets/video/
    ./deploy.sh
