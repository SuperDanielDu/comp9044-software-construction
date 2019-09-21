#!/usr/bin/perl -w

if (@ARGV != 3){
	print "3 arguments are needed.";
	exit 0;
}
if (-e $ARGV[2]){
	unlink $ARGV[2];
}

open(OUT,">>$ARGV[2]") or die "Can't open $ARGV[2]: $!";

for($i=$ARGV[0];$i<=$ARGV[1];$i++){
	print OUT "$i\n";
}

close OUT;
