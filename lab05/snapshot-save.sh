#!/bin/dash

version=-1
for file in .*
do
	filename=`echo "$file"|egrep "\.snapshot\.[0-9]+"`
	if [ "$file" = "$filename" ]
	then
		version_=`echo "$file"|cut -d. -f3`
		if [ $version_ -gt $version ]
		then
			version=$version_
		fi
	fi
done

version=`expr $version + 1`
mkdir .snapshot.$version
for file in *
do
	filename=`echo "$file"|egrep -v "(snapshot-save.sh)|(snapshot-load.sh)"`
	if [ "$file" = "$filename" ]
	then
		cp "$file" '.snapshot.'$version'/'$file''
	fi
done
echo 'Creating snapshot '$version''
