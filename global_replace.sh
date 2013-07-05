#!/bin/bash


find . -type f -name "*.html" | xargs grep "\"\/css/" | awk -F: '{print $1}' > tmp.txt
find . -type f -name "*.html" | xargs grep "\"\/js/" | awk -F: '{print $1}' >> tmp.txt
find . -type f -name "*.html" | xargs grep "\"\/images/" | awk -F: '{print $1}' >> tmp.txt

cat tmp.txt | sort -u > $$.txt

for filename in `cat  $$.txt`
do
	echo "replaceing $filename"
	mv  $filename ${filename}.bak
	cat ${filename}.bak | sed -e 's/"\/js/"\/static\/js/g' -e 's/"\/css/"\/static\/css/g' -e 's/http:\/\/192.168.160.172\/static\//\/static\//g' -e 's/http:\/\/ajax.googleapis.com\/ajax\/libs\/jquery\/1\//\/static\/js\//g' > $filename 
	
	if [ $? = 0 ]; then

		echo "replaceing $filename done"
	else
		echo "replaceing $filename error"
	fi
done

find . -type f -name "*.bak" | xargs rm

rm -rf $$.txt

