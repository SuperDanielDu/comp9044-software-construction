#!/usr/bin/perl -w
use JSON;
use Data::Dumper;


open IN,'<',"$ARGV[0]" or die 'cant open';
@list=<IN>;
#chomp(@list);
$string= join "",@list;
@json=@{decode_json($string)};
$total=0;
for $bill (@json){
	for $hash (@$bill){
		$price=$$hash{'price'}=~s/\$//r;
		$total+=$price;
	}
}
printf "\$%.2f\n" , $total;

