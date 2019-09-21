#!/usr/bin/perl -w
use File::Copy;
#use strict;

sub save{
	$version=-1;
	foreach $file (glob ".*"){
		if ($file =~ m|(\.snapshot\.)(\d+)$|){
			if ($2>$version){
				$version=$2;
			}
		}
	}
	$version+=1;
	mkdir ".snapshot.$version" or die "Cannot create repository.";
	
	foreach $file (glob "*"){
		if ($file !~ m/snapshot\.pl/){
			copy("$file", ".snapshot.$version/$file");
		}
	}
	print "Creating snapshot $version\n";
}

sub load{
	($num)=@_;
	if (!-e ".snapshot.$num"){
		die "No repository .snapshot.$num. $!";
	}
	save();
	foreach $file_l (glob ".snapshot.$num/*"){
		$newfile_l = $file_l =~ s|\.snapshot\.$num\/||r;
		#print"$newfile_l , $file_l\n";
		copy("$file_l", "./$newfile_l");
	}
	print "Restoring snapshot $num\n";
}


if (($ARGV[0] eq 'save') and (@ARGV==1)){
	save();	
}
elsif (($ARGV[0] eq 'load') and (@ARGV==2) and ($ARGV[1] =~ m/[0-9]+/)){
	load($ARGV[1]);
}
else{
	die "Wrong arguments. $!";
}
