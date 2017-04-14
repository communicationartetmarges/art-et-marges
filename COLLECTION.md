
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
./www/collection/gen.py\
templates/fr-collection-10artistes-06042017.csv \
templates/fiche-artiste.html\
www/collection/fr\
templates/link-artiste.html\
/collection/fr
```
