#!/bin/sh

if [ $# -ne 3 ]
then
	echo 'Invalid argument numbers. We need 3 arguments.'
	exit 0;
fi

if [ -e $3 ]
then
	rm "$3"
fi

for((i=$1;i<=$2;i++))
do
	echo "$i" >> "$3"
done
