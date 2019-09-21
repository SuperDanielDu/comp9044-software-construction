#!/bin/sh

fun(){
	if [[ "$1" =~ \.mp3$ ]]   #if file is mp3 file
	then
	#change title
	title=`echo "$1"|sed 's/ - /|/g'|cut -d'|' -f2|sed -e 's/^[ ]*//g' -e 's/[ ]*$//g'`
	id3 "$1" -t "$title" >/dev/null
	#change artist
	artist=`echo "$1"|sed 's/ - /|/g'|cut -d'|' -f3-|sed 's/.mp3//g'|sed -e 's/^[ ]*//g' -e 's/[ ]*$//g'`
	id3 "$1" -a "$artist" >/dev/null
	#change album
	album=`echo "$1"|cut -d/ -f2|sed -e 's/^[ ]*//g' -e 's/[ ]*$//g'`
	id3 "$1" -A "$album" >/dev/null
	#change year
	year=`echo "$1"|cut -d/ -f2|cut -d, -f2|sed -e 's/^[ ]*//g' -e 's/[ ]*$//g'`
	id3 "$1" -y "$year" >/dev/null
	#change track
	track=`echo "$1"|cut -d/ -f3|cut -d- -f1|sed -e 's/^[ ]*//g' -e 's/[ ]*$//g'`
	#echo "$1"
	#echo "$track"
	id3 "$1" -T "$track" >/dev/null
	fi
}



for dire_a in "$@"  # iterate every argument
do
	if [ -d "$dire_a" ]       #if dire_a is a directory
	then
		if [[ "$dire_a" =~ /$ ]]
		then
			dire_a=${dire_a%/*}
		fi
		for file in "$dire_a"/*
		do
			fun "$file"
		done
	fi
done

















