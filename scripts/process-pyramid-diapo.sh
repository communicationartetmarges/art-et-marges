#!/bin/bash
# This script should be used in the folder containing the diapo images


sourceDir="/medias/diapo/home/america"
destDir="pyramid"

# WE FIRST MOVE EVERYTHING IN A DESTINATION FOLDER

mkdir $destDir
cp *.* $destDir
cd $destDir


# QUICK FILE NAME AND CONVERSION PROCESS

# replace space with underscore in filename
for f in *\ *; do mv "$f" "${f// /_}"; done
# replace A. with A_ in filename
for f in *; do mv "$f" "${f//A./A_}"; done
# rename .JPG in .jpg
for f in *.JPG; do mv "$f" "${f//.JPG/.jpg}"; done
# rename .PNG in .png
for f in *.PNG; do mv "$f" "${f//.PNG/.png}"; done
# convert .png to .jpg
listPng=$(ls *.png | cut -f 1 -d '.' | sort)
for i in $listPng
do
convert  $i.png $i.jpg
done


# PUT FILENAME IN COPYRIGHT TAG

listJpg=$(ls *.jpg | cut -f 1 -d '.' | sort)

for img in $listJpg;
do 
    # replace filename underscore with space
    txt="${img//_/ }" 
    # use exiftool to insert processed filename as copyright tag
    exiftool -Copyright="$txt" -overwrite_original $img.jpg
done;


# CREATE PYRAYMID + echo HTML on the fly

list=$(ls *.jpg | cut -f 1 -d '.' | sort)
srcSetSizes="100vw"
dirURL=$sourceDir/$destDir 

for img in $list;
do 
name=$(convert $img.jpg -format "%t" info:)
copyright=$(exiftool -Copyright -s -s -s $img.jpg)
imgWidth=$(exiftool -ImageWidth -s -s -s $img.jpg)


    # MAKE PYRAMID
    SIZE=400
    while [ $SIZE -lt $imgWidth ] 
    do 
        convert -resize $SIZE $img.jpg "${name}-"$SIZE.jpg
        SIZE=$((SIZE + 400)) 
    done;

    # PRINT HTML 

    echo '
    <div class="carousel-cell">
        <img data-flickity-lazyload-srcset=" '
            SIZE=400
            while [ $SIZE -lt $imgWidth ] 
            do 
                BIGGERSIZE=$((SIZE + 400))
                # we check if we are at the last iteration of the while loop
                if [ "$BIGGERSIZE" -lt "$imgWidth" ]
                then  echo $dirURL/$img-$SIZE.jpg "$SIZE"w,
                elif [[ $BIGGERSIZE -gt $imgWidth ]]
                then  echo $dirURL/$img-$SIZE.jpg "$SIZE"w'"'
                fi
                SIZE=$((SIZE + 400)) 
            done; 

    echo '  sizes="'$srcSetSizes'"
            data-flickity-lazyload-srcset="'$dirURL/$img.jpg'"
            alt="'$copyright'">
        <div class="carousel-cell-caption">
            '$copyright'
        </div>
    </div>
    '
done;

