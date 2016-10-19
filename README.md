# art-et-marges
A website for Art et Marges Museum


## Insertion d'images
Dimensions images : max 2048 x 2048 px  
nom de fichier propres : pas de charactères bizares ni d'espaces dans le nom.  

Exemples :  
NON : `"l'image de l'expo / v2.jpg"`  
OUI : `"image-expo_v2.jpg"`


Les images stockées dans le dossier `medias/images/` sont insérées comme suit dans le html : 

`<div class="image-container" data-image = "nom_image">`


## ! 
- Le fichier .css est compilé à partir des fichiers .less, ne modifiez pas ces fichiers sans être sûr de ce que vous faites.
