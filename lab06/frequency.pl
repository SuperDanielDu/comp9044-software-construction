#!/usr/bin/perl -w

#count function
sub count{
	($w,$file_count)=@_;
	open $f,"<","$file_count" or die "cant open";
	$occur=0;
	for $line (<$f>){
		@line = split /[^a-z]+/i,$line;
		for $word (@line){
			#print"$word\n";
			if ($w =~ m/^$word$/i){
				$occur+=1;
			}
		}
	}
	close $f;
	return $occur;
}
#total function
sub total{
	($file_total)=@_;
	open $f,'<',"$file_total" or die 'cant open';
	$word=0;
	for $line (<$f>){
		chomp $line;
		if ($line =~ /^\s*$/){
			next;
		}
		$line =~ s/^[^a-z]+//gi;
		@line = split /[^a-z]+/i,$line;
		$word+=scalar @line;
	}
	close $f;
	return $word;
}

$n=0;
foreach $file (glob "lyrics/*.txt"){
	$list[$n]=$file;
	$n++;
}
@list=sort @list;

for $file  (@list){
	$totalwords=total($file);
	$occur=count($ARGV[0],$file);
	$file=~s/lyrics\///;
	$artist=$file=~s/.txt$//r;
	#print"$artist";
	$artist=~s/_/ /g;
	#print"$artist";
	printf "%4d/%6d = %.9f %s\n", $occur, $totalwords, $occur/$totalwords,$artist;
}

