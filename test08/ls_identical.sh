#!/bin/sh


for i in "$1"/*
do
	file=`echo "$i"|sed 's|.*\/||g'`
	if [ ! -e "$2"/"$file" ]
	then
		continue
	else
		diff "$i" "$2"/"$file"  > /dev/null
		if [ $? = 0 ] #same
		then
			echo "$file"
		fi
	fi
done
