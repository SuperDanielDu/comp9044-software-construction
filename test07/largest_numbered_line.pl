#!/usr/bin/perl -w
sub find_max{
	@list=@_;
	$max=$list[0];
	for $i (@list){
	#print"$i\n";
		if($i>$max){
			$max=$i;
		}
	}
#	print "$max\n";
	return $max;
}

for $line (<STDIN>){
	@list=$line=~m/-?\d*\.?\d+/g;#-.num   .num   -num  num.num   -num.num     num
	if(@list){
		push @maxes,find_max(@list);
		push @line_lists,$line;
	}
	else{
		next;
	}
}

$max_line_num=find_max(@maxes);
for ($num=0;$num<@maxes;$num++){
	if ($maxes[$num]==$max_line_num){
		print "$line_lists[$num]";
	}
}
