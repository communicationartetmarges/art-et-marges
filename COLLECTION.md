
collection
==========


## génerer la collection

le script Python ```www/collection/gen.py``` génère les fiches et imprime à l'écran ce qui doit être inséré dans la page ```musée```.

#### dépendances

- python3
- python-slugify => ```pip install python-slugify```

#### arguments

- chemin vers fichier CSV
- chemin vers template fiche artiste
- chemin vers dossier cible
- chemin vers template d'aperçu pour page musée
- base_url pour lien (exemple: '/collection/fr')

exemple:
```
./www/collection/gen.py \
templates/collection-all-fr.csv \
templates/fiche-artiste-fr.html \
www/collection/fr \
templates/link-artiste.html \
/collection/fr \
| pbcopy

./www/collection/gen.py \
templates/collection-all-nl.csv \
templates/fiche-artiste-nl.html \
www/collection/nl \
templates/link-artiste.html \
/collection/nl \
| pbcopy

./www/collection/gen.py \
templates/collection-all-en.csv \
templates/fiche-artiste-en.html \
www/collection/en \
templates/link-artiste.html \
/collection/en \
| pbcopy
```

#### extra

- Ajouter ```| pbcopy``` pour copier le resultat dans le press papier
- pour générer les vignette avec ImageMagick depuis la racine du dépot, utiliser : 
```
mogrify -path www/medias/images/collection/thumbnails/ \ 
-resize 400x400^ \
-gravity Center \
-extent 400x400 \
www/medias/images/collection/source/*
``` 
!! certains thumbnails sont actuellement importés manuellement, séparément. C'est le cas pour Cosijn et Delaunay. Il faut les sauvegarder puis les remettre dans le dossier pour ne pas qu'ils soient écrasés par le thumbnail automatique.