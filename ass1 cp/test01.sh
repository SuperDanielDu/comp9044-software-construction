#!/bin/sh

#commit without previous add
#add non-existing file
rm xxx
rm .legit

#init add commit
./legit-init

# then directly use commit
./legit-commit
#should output nothing to commit.

./legit-add xxx #(xxx not in directory)
#should ouput:    ./legit-add: error: can not open 'xxx'

