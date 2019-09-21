#!/usr/bin/perl -w

if (@ARGV==0) {
	print "Usage: $0 <files>";
	exit 0;	
}

sub compare{
	($a,$b)=@_;
	open DATA_A,'<',"$a" or die "cant open $a: $!";
	open DATA_B,'<',"$b" or die "cant open $b: $!";
	@line_b=<DATA_B>;
	#$line_b='';
	while ($line_a=<DATA_A>){
		#$line_b='';
		$line_b = shift @line_b;
		if (defined($line_b)==0){
			return 0;
		}
		if ($line_a ne $line_b){
			return 0;
		}
	}
	return 1;
	close DATA_A;
	close DATA_B;
}


for $file1 (@ARGV){
	for $file2 (@ARGV){
		if(compare($file1,$file2)!=1){
			print "$file2 is not identical\n";
			exit 0;
		}		
	}
}
print "All files are identical\n";
