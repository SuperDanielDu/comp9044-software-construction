#!/bin/bash

if (($# != 2))
then
	printf "Usage: ./echon.sh <number of lines> <string>\n"
	exit
fi

#if cat $1 | egrep "^[[0-9]|[1-9][0-9]+]$" > /dev/null
if [[ $1 =~ ^[0-9]|[1-9][0-9]+$ ]]
then
	for i in $(seq 1 1 $1)
do
	printf "%s\n" $2
done
else
	printf "./echon.sh: argument 1 must be a non-negative integer\n"
	exit
fi



