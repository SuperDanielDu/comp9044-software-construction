#!/usr/bin/perl -w


(@ARGV == 2) || (print "Usage: ./echon.pl <number of lines> <string>\n" and exit 0);

($ARGV[0] =~ m/^[0-9]+$/) || (print "./echon.pl: argument 1 must be a non-negative integer\n" and exit 0);

for($i=0;$i<$ARGV[0];$i++){
	print "$ARGV[1]\n";
}

