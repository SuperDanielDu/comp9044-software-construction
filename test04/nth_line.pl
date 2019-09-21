#!/usr/bin/perl -w

if (@ARGV!=2){
	print "2 arguments are needed.";
	exit 0;
}
if (!-e $ARGV[1]){
	print "The file $ARGV[1] dosen't exist";
	exit 0;
}

open (IN, "<$ARGV[1]") or die "Can't open $ARGV[1]: $!";
@line = <IN>;
close IN;

if ($ARGV[0]>@line){
	print "";
}
else{
	print "$line[$ARGV[0]-1]";
}
