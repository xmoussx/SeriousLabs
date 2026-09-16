# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dirigeants, associés et gérants de très petites structures françaises de 5 à 20 personnes : cabinets d'expertise comptable, avocats, agences, bureaux d'études, artisans structurés, professions libérales.

Leur situation : pas de direction informatique, pas de temps dégagé pour un projet, des coûts qui montent. Personne chez eux ne mesure où passent les heures, et celles qui se perdent ne partent pas dans le métier mais autour — correspondance réécrite, devis repris de zéro, documents introuvables, administratif repoussé au samedi.

Le décideur est presque toujours le propriétaire de l'entreprise. Il paie de sa poche et juge en minutes, pas en fonctionnalités.

## Product Purpose

Une intervention d'une journée en présentiel dans les locaux du client : formation d'un groupe le matin, installation et configuration des outils l'après-midi, puis un point de contrôle à trente jours inclus.

**Quatre participants au maximum par journée.** C'est une contrainte de fond, pas un détail de planning : une structure de vingt personnes suppose donc plusieurs journées. Toute formulation du type « toute l'équipe formée en même temps » contredit cette limite et ne doit pas réapparaître.

Le succès se mesure à une chose : trente jours après, les outils sont encore utilisés. Ce qui ne l'est pas est corrigé ou retiré.

## Positioning

L'IA ne produit jamais le livrable à la place du client. Elle prépare, cherche et met en forme ; l'expert décide, relit et signe. Aucun document ne sort de chez le client sans qu'une personne de son équipe l'ait écrit, relu et assumé.

C'est la ligne de partage avec les vendeurs d'agents autonomes, et elle n'est pas négociable. Corollaire commercial : les outils installés restent chez le client et lui appartiennent — pas de plateforme louée, pas de dépendance au prestataire, pas de consultant qui revient tous les mardis.

## Operating Context

L'intervention prend la forme d'une journée de formation professionnelle et entre dans le budget formation interne du client.

Zone d'intervention affichée : Paris et Île-de-France en présentiel, le reste de la France selon le calendrier.

Le premier contact se fait par un formulaire ou par courriel. La promesse de réponse est d'un jour ouvré, sans rendez-vous commercial obligatoire.

## Capabilities and Constraints

- Site statique, sans étape de compilation : HTML, CSS et JavaScript écrits à la main, servis par nginx depuis un VPS dont le client est propriétaire.
- Un seul point d'entrée dynamique : un script PHP qui traite le formulaire et envoie par SMTP authentifié chez OVH. L'extension mbstring n'est pas installée sur le serveur.
- Aucun cookie, aucun traceur, aucune mesure d'audience. Cette absence est un choix assumé : elle supprime le bandeau de consentement et le risque associé.
- Bilingue français et anglais, en deux pages statiques distinctes liées par des balises `hreflang`. Le français est la langue principale.
- **Scènes de formation en images de synthèse, décidées par le client le
  16.09.2026.** Une scène qui illustre l'intervention n'est pas une preuve
  fabriquée : personne ne lit l'image d'accueil d'un site comme un reportage.
  La ligne à ne pas franchir est ailleurs — aucune légende ne doit désigner un
  client réel, nommer une entreprise ou tenir lieu de témoignage, et aucun
  visage ne doit être le sujet du cadre. Le premier plan montre quatre
  participants assis et une personne debout qui explique, ce qui rend
  visuellement la limite des quatre.
- **Un plan du carnet à souche a été produit puis retiré** à la demande du
  client, avec le monde visuel qui le portait.
- **Aucun calculateur.** Il a existé puis a été retiré : il demandait au visiteur de régler des curseurs et de lire des hypothèses avant de comprendre l'offre. Ne pas le réintroduire sans décision explicite.
- Tarifs **non affichés** : devis sur mesure.
- Certification Qualiopi et déclaration d'activité d'organisme de formation **en cours d'obtention**. Tant qu'elles ne sont pas acquises, aucune prise en charge par un OPCO n'est possible et le site doit le dire explicitement.
- Le code NAF déclaré est encore 58.21Z, édition de jeux électroniques, et ne correspond plus à l'activité.

## Brand Commitments

Nom : Serious Labs. Forme juridique : SAS, siège au 12 rue Juliette Dodu, 75010 Paris. Le siège figurant dans les mentions légales doit rester l'adresse réellement immatriculée.

Monde visuel : **« La journée »** — la page est l'emploi du temps de la journée
vendue. Il remplace « le carnet à souche », abandonné le 16 septembre 2026 :
celui-ci avait dérivé de la demande d'origine, ultra moderne et hyper dépouillé,
vers un imprimé rétro et dense, et il déguisait en paperasse un service qui vend
la sortie de la paperasse. Voir `DESIGN.md`.

Symbole : le logo d'origine, vectorisé fidèlement par tracé de son fichier — fiole de laboratoire contenant une croix directionnelle et des boutons de manette. Des redessins ont été proposés et écartés par le client : ce sont ses contours qui font foi, manette comprise. L'original est versionné dans `assets/brand/`, il n'existe nulle part ailleurs.

La manette évoque le jeu vidéo, ce que l'activité n'est plus. Le client le sait et a tranché en connaissance de cause.

Voix : directe et concrète, sans jargon technologique, tutoyant le problème plutôt que le produit. Le site dit ce qui n'est pas encore acquis plutôt que de le laisser deviner.

## Evidence on Hand

**Aucune preuve sociale n'existe à ce jour** et rien ne doit être fabriqué pour y suppléer : pas de client de référence sur cette activité, pas de témoignage, pas de logo, pas d'étude de cas, pas de certification acquise, pas de chiffre issu d'une mission réelle.

Ce qui existe réellement et peut porter la démonstration :

- le déroulé détaillé d'une intervention, qui vaut engagement ;
- les mentions légales complètes et vérifiables sur l'annuaire des entreprises ;
- l'aveu explicite que Qualiopi n'est pas obtenue, qui est en soi un signal de fiabilité.

Toute section de preuve sociale doit donc être absente, et la page doit tenir debout sans elle.

## Product Principles

1. **L'humain garde la main.** Ce principe irrigue chaque section plutôt que d'occuper un bloc dédié — le client l'a explicitement demandé ainsi.
2. **Ne rien avancer qu'on ne puisse défendre.** Aucun chiffre de gain n'est affiché : ceux qui l'étaient reposaient sur des hypothèses que le visiteur devait lire pour les comprendre, et un au moins n'était étayé par rien.
3. **Dire ce qui n'est pas acquis.** Qualiopi en cours, pas de prise en charge OPCO, quatre participants au maximum. La transparence remplace la preuve sociale absente.
4. **Rien ne dépend d'un tiers.** Ni plateforme louée côté client, ni service externe côté site : pas de traceur, pas de captcha, pas de dépendance de rendu.
5. **Le temps, pas la technologie.** L'unité de valeur est l'heure récupérée, jamais la fonctionnalité.

## Accessibility & Inclusion

Le public n'est pas technique et consulte souvent depuis un téléphone. Contraste conforme, navigation au clavier, cibles tactiles suffisantes, `prefers-reduced-motion` respecté et aucune information portée par la seule couleur.
