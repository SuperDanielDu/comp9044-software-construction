#!/usr/bin/perl -w
for $line (<STDIN>){
	chomp $line;
	if (exists($line_show{$line})){
		$line_show{$line}++;
	}
	else{
		$line_show{$line}=1;
	}
	if ($line_show{$line}==$ARGV[0]){
		print "Snap: $line\n";
		exit;
	}
}
