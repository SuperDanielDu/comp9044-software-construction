#!/usr/bin/perl
open IN,'<',"$ARGV[0]" or die "cant open";
for $line (<IN>){
	chomp $line;
	@list=split //,$line;
	$file{$line}=@list;
}
close IN;
my @file_lines = sort {$file{$a} <=> $file{$b}} sort keys %file;                   ###########!!!!!!!!!!!!Your program should print the lines of the file in order of length, shortest to longest.
Lines of equal length should be sorted alphabetically.
for $line (@file_lines){
	print"$line\n";
}

