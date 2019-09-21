#!/bin/sh

for file in *
do
	if [[ "$file" =~ htm$ ]]
	then
		new=`echo "$file"|sed 's/htm$/html/g'`
		if [ -e "$new" ]
		then
			echo "${new} exists"
			exit 1
		fi
		mv "$file" "$new"
	fi
done
