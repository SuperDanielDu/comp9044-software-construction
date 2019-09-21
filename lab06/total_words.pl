#!/usr/bin/perl
$word=0;

for $line (<STDIN>){
	chomp $line;
	if ($line =~ /^\s*$/){
		next;
	}
	$line =~ s/^[^a-z]+//gi;
	@line = split /[^a-z]+/i,$line;
	#for $lin (@line) {
	#	$word += 1 if $lin =~ /[a-z]+/i;
	#	print "$lin\n";
	#}
	#print"@line\n";
	$word+=scalar @line;
}

print "$word words\n";
