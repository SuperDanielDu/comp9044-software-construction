#!/bin/sh

for cfile in "$@"
do
	l=`cat "$cfile"|egrep "#include \".*\""|egrep -o "[a-z]*\.[a-z]*"`

	for file in "$l"
	do

		if ! [ -e "$file" ]
		then
			echo "${file} included into ${cfile} does not exist"
		fi
	done
done
