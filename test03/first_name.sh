#!/bin/sh

name=`cat "$1" | egrep "^COMP[29]041"| cut -d\| -f3| cut -d, -f2|cut -d' ' -f2|sort|uniq -c|sort|tail -1|sed 's/[0-9 ]*//g'`
echo "$name"
