#!/bin/sh

for pic in $@
do
	time=`ls -l "$pic"| cut -d' ' -f6-8`
	mv -- "$pic" "tem${pic}"
	convert -gravity south -pointsize 36 -draw "text 0,1 '$time'" "tem${pic}" "$pic"
	rm "tem${pic}"
done
