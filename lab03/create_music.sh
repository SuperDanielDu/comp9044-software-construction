#!/bin/sh

raw=`wget -q -O- 'https://en.wikipedia.org/wiki/Triple_J_Hottest_100?action=raw'`
if ! [ -e "$2" ]
then
	mkdir "$2"
fi
direc_list=`echo "$raw"|egrep "style="| egrep -o "\[(.)*\]"|egrep -io "[a-z0-9 ,|]*"|egrep "\|[0-9]*$"`

old="$IFS"
IFS=$'\n'
for i in $direc_list           # i repre every file -> Triple J Hottest 100, 1993|1993
do	
	filename=`echo "$i"|cut -d\| -f1`
	#echo "${2}/${filename}"
	if ! [ -e "${2}/${filename}" ]
	then
		`mkdir "${2}/${filename}"` # make dir
	fi
	music_list=`echo "$raw"|egrep "$filename" -A11|egrep "^#"`
	track=0
	
	for ii in $music_list        # ii-> #[[Denis Leary]] – "[[Asshole (song)|Asshole]]"
	do
		author=`echo "$ii"|sed -e 's/.*–//g' -e 's/^[ ]*//g' -e 's/\"//g' -e 's/\[//g' -e's/\]//g'|cut -d\| -f2|sed 's/\//-/g'|sed 's/[ ]*$//g'`
		
		music_name=`echo "$ii"|sed -e 's/–.*//g' -e 's/#[ ]*/#/g'|sed 's/ \[\[.*|/ /g'|sed -e 's/#\[\[.*|//g' -e 's/#//g' -e 's/[ ]*$//g' -e 's/\"//g' -e 's/\[//g' -e 's/\]//g'|sed -e 's/\//-/g' -e 's/^[ ]*//g'`
		#if [[ "$music_name" =~ \[\[.*\|.*\]\] ]]
		#then
		#	featurer=`echo "$music_name"|cut -d\| -f2`
		#	#echo "$featurer"
		#	original=`echo "$music_name"|egrep -o ".*featuring "`
		#	#echo "$original"
		#	music_name="$original""$featurer"
		#else
		#	music_name=`echo "$music_name"|cut -d\| -f2`
		#fi
		((track+=1))
		file_name="${track} - ${author} - ${music_name}.mp3"
		
		`cp "$1" "${2}/${filename}/${file_name}"`
	done
done
IFS="$old"
