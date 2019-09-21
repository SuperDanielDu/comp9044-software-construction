#!/bin/bash

under=`curl --silent "http://legacy.handbook.unsw.edu.au/vbook2018/brCoursesByAtoZ.jsp?StudyLevel=Undergraduate&descr="${1:0:1}""|grep "$1"|sed "s/\t//g"|egrep -o "<A .+>.*</A></TD>"| cut -d'>' -f1,2|egrep -o "[A-Z]{4}[0-9]{4}.*$"|sed "s/.html\">/ /g"|sed "s% *</A%%g"`

post=`curl --silent "http://legacy.handbook.unsw.edu.au/vbook2018/brCoursesByAtoZ.jsp?StudyLevel=Postgraduate&descr="${1:0:1}""|grep "$1"|sed "s/\t//g"|egrep -o "<A .+>.*</A></TD>"| cut -d'>' -f1,2|egrep -o "[A-Z]{4}[0-9]{4}.*$"|sed "s/.html\">/ /g"|sed "s% *</A%%g"`

if [ -n "$under" ]
then
	list="$under\n$post"
else
	list="$post"
fi
#printf "$post\n"
#echo "$list"

echo -e "$list"|sort -n -k'1'|uniq
