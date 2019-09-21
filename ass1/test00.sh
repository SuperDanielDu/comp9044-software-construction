#!/bin/sh

#test for init add commit

#init twice
./legit-init
./legit-init
#should output error    legit-init: error: .legit already exists
touch a
./legit-add a
./legit-commit -m commit-0
./legit-commit -m commit-0
#should output nothing to commit

#wrong commit cammand
./legit-commit -m da dsa dsa da
#output: 2 arguments needed
