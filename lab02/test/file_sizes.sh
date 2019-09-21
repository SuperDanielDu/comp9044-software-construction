#!/bin/bash

small=""
medium=""
large=""

for file in $(ls)
do
	if [ ${file} = file_sizes.sh ]
	then
		continue
	fi

	line=$(wc -l ${file} | cut -d' ' -f1)

	
	if [ $line -lt 10 ]
	then
		small="${small} ${file}"
	elif [ $line -ge 10 -a $line -lt 100 ]
	then
		medium="${medium} ${file}"
	else
		large="${large} ${file}"
	fi
done


printf "Small files:${small}\nMedium-sized files:${medium}\nLarge files:${large}\n" 
