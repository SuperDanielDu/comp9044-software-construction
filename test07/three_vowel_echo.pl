#!/usr/bin/perl -w
#for $i ('a','e','i','o,','u','A','E','I','O','U'){
#	$vowel{$i}='';
#}
	
for $arg (@ARGV){
	if ($arg =~ /[aeiou]{3}/gi){
		push @list,$arg
	}
}
print"@list\n";
	#@arg_list=split //,$arg;
	#if (@arg_list<3){
	#	next;
	#}
	#else{
	#	$count=0;
	#	for $i (@arg_list){
	#		if (exists($vowel{$i})){
	#			$count++;
	#			if($count==3){
	#				print "$arg\n";
	#				last;
	#			}
	#		}
	#		else{
	#			$count=0;
	#		}
	#	}
	#}

