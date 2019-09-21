#!/usr/bin/perl -w

while ($a=<STDIN>){
	open F , "<<$a" or die "cant open";
}
@list=<F>;
close F;


