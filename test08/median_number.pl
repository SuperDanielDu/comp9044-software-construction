#!/usr/bin/perl -w
#@list=sort @ARGV;
#print"@list\n";
$m=(sort {$a <=> $b} @ARGV)[(@ARGV-1)/2];
print "$m\n";
