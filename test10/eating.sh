#!/bin/sh


cat "$1"|egrep 'name'|cut -d, -f1|cut -d: -f2|cut -d\" -f2|sort|uniq
