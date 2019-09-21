#!/usr/bin/perl
for $word (@ARGV){
	if (exists($show_words{$word})){
	}
	else{
		$show_words{$word}=1;
		push @word_list,$word;
	}
}
print "@word_list\n";
