#!/usr/bin/perl -w

foreach $arg (@ARGV) {
    if ($arg eq "--version") {
        print "$0: version 0.1\n";
        exit 0;
    }
    elsif ($arg =~ /^-[0-9]+$/){
    	$arg =~ s/-//g;
    	$line = $arg;
    }                               #tail.pl < t1.txt
    else {
        push @files, $arg;
    }
}


while($a=<STDIN>){
	#chomp $a;
	push @list, $a;
}

if (@list){
	foreach $file (@files){
		open(F,"<$file") or die "$0: Can't open $file: $!\n";
		@list2=<F>;
		@list = (@list,@list2);
	}

	$i= @list - 10;
	if ($i<0){
		$i=0;
	}

	for(;$i<@list;$i++){
		print "$list[$i]";
	}
}
else{
	foreach $file (@files) {
		if (@files>1){
			print "==> $file <==\n";
		}
		open F, '<', $file or die "$0: Can't open $file: $!\n";
		
		@contents = <F>;
		unless (defined($line)){
			$line = 10;
		}
		
		
		$i=@contents-$line;
		if ($i<0){
			$i=0;
		}
		for(;$i<@contents;$i++){
			print "$contents[$i]";
		}

		close F;
	}
}
