#!/usr/bin/perl -w

while ($line=<>){
	#chmod $line;
	@line=split(/\s+/,$line);
	@line= sort(@line);
	print"@line\n";
}
