#!/bin/sh

# rm status

touch a
touch b
touch c
touch d
touch e
touch f g h
./legit-init
./legit-add a b c d

./legit-rm a
./legit-rm -cached b
./legit-rm -force b
./legit-rm -force -cached c

echo 1 >d
./legit-status
./legit-add f g h
./legit-commit -m commit-0
./legit-rm f
./legit-rm -cached -g
./legit-status
