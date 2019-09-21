#!/usr/bin/perl -w

open IN,'<',"$ARGV[0]" or die "cant open";
@list=<IN>;
close IN;
if (!@list){
	exit;
}
if (@list%2==0){
	print "$list[@list/2-1]$list[@list/2]";
}
else{
	print "$list[(@list-1)/2]";
}
