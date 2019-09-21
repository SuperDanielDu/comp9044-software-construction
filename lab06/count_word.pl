#!/usr/bin/perl -w
$occur=0;

for $line (<STDIN>){
	@line = split /[^a-z]+/i,$line;
	for $word (@line){
		#print"$word\n";
		if ($ARGV[0] =~ m/^$word$/i){
			$occur+=1;
		}
	}
}
print "$ARGV[0] occurred $occur times\n";
