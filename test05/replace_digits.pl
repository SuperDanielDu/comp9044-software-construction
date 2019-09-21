#!/usr/bin/perl -w

if (@ARGV!=1){
	print "1 argument only.";
	exit 0;
}
open IN, '<',"$ARGV[0]" or die "cant open $ARGV[0]:$!";
open OUT, '>', "$ARGV[0]_temp" or die "cant open $ARGV[0]:$!";
for $line (<IN>){
	$line =~ s/\d/#/g;
	#print $line;
	print OUT "$line";
}
#open $out, '>', "$ARGV[0]" or die "cant open $ARGV[0]:$!";
close IN;
close OUT;
#unlink "$ARGV[0]";
rename "$ARGV[0]_temp", "$ARGV[0]" or die "$0: Can not rename file";
