#!/usr/bin/perl -w



if (@ARGV!=1){
	die "1 argument is needed. $!\n";
	#print "perl_print.pl";
}

#print "$ARGV[0]\n";
#$sentence='print "$ARGV[0]\n"';
#$thing=$ARGV[0];
#if ($ARGV[0]=~\\){
	
#}
$ARGV[0]=~s|\\|\\\\|g;
$ARGV[0]=~s/\"/\\\"/g;
$ARGV[0]=~s/\'/\\\'/g;

print "-e print \"${ARGV[0]}";
print '\n"';








#if (@ARGV==1){
#	print"perl_print.pl \n";
#}
#elsif(@ARGV==0){
	
#}
