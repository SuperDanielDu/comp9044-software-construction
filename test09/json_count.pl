#!/usr/bin/perl -w
use JSON;
use Data::Dumper;


open IN,'<',"$ARGV[1]" or die 'cant open';
@list=<IN>;
chomp(@list);
$string= join "",@list;
@json=@{decode_json($string)};
$sum=0;
for $i (@json){
    if ($$i{'species'} eq $ARGV[0]){
        $sum+=$$i{'how_many'};
    }
}
print "$sum\n";
# @decode=decode_json($json);
# print Dumper(@json);

close IN;