#!/usr/bin/perl -w

#use File::Copy

open (IN,"<$ARGV[0]") or die "Can't open $ARGV[0].";
$version=-1;
for $file (glob ".*"){
	if ($file =~ m/(\.$ARGV[0]\.)([0-9]+)$/){
		$version_=$2;
		if($version_ >$version){
			$version=$version_;
		}
	}
}
#print"1\n";
$version+=1;
open OUT, '>', ".$ARGV[0].$version" or die "cant open create file.";
for $line (<IN>) {
	print OUT "$line";
}
close(IN);
close(OUT);

#copy $ARGV[0] .$ARGV[0].$version

print "Backup of '$ARGV[0]' saved as '.$ARGV[0].$version'\n";
