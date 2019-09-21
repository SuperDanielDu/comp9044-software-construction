#!/bin/dash

if ! [ -e .snapshot."$1" ]
then
	echo "No repository directory."
	exit 0;
fi

snapshot-save.sh

for i in .snapshot."$1"/*
do
	new=`echo "$i"|sed 's|\.snapshot\.'$1'\/||g'`
	#echo "$new"
	cp -f "$i" ./"$new"
done

echo 'Restoring snapshot '$1''
