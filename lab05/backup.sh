#!/bin/sh

if ! [ -e $1 ]
then
	echo "$1 dose not exist."
	exit 0;
fi

version=-1
for file in .*
do
	if [[ $file =~ \."$1"\.[0-9]+$ ]]
	then
		version_=`echo "$file" | cut -d. -f4`
		if [ $version_ -gt $version ]
		then
			version=$version_
		fi
	fi
done

((version+=1))
cp "$1" ."$1"."$version"
echo "Backup of '"$1"' saved as '."$1"."$version"'"
