#!/bin/sh

# branch checkout merge

./legit-init
./legit-branch
#error
touch a
./legit-add a
./legit-commit -m commit-0
./legit-branch b1
./legit-branch
touch b
./legit-add b
./legit-commit -m commit-1
./legit-branch b2
./legit-branch -d master
#error
./legit-checkout b1
./legit-add a
./legit-commit -m commit-2

./legit-checkout b1
./legit-add a
./legit-commit -m commit-2
./legit-checkout b2
./legit-commit -m commit-2

