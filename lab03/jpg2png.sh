#!/bin/sh

for file in *
do
	if [[ "$file" =~ .jpg$ ]]
	then
		pngfile=`echo "$file" | sed 's/\.jpg/\.png/g'`;

		if [ -e "$pngfile" ]
		then
			echo "$pngfile" already exists
			exit 1
		fi
		
		`convert "$file" "$pngfile"`
		rm "$file"
	fi
done
