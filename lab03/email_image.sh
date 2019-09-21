#!/bin/sh

for file in $@
do
	if ! [ -e "$file" ] 2>/dev/null
	then
		echo "no '$file'"
		exit 1
	fi
	`display "$file"`
	read -p "Address to e-mail this image to? " email
	read -p "Message to accompany image? " message
	echo "$message"|mutt -s "$file" -e 'set copy=no' -a "$file" -- "$email"
	echo "${file} sent to ${email}"
done
