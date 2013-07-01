#!/bin/bash

find . -type f -name "*.html" | xargs grep "static.b2b.com" | awk -F: '{print $1}' | sort -u > $$.txt

for filename in `cat  $$.txt`
do
	echo "replaceing $filename"
	mv  $filename ${filename}.bak
	cat ${filename}.bak | sed -e 's/http:\/\/static.b2b.com\//\//g' -e 's/http:\/\/192.168.160.172\/static\//\//g' -e 's/http:\/\/ajax.googleapis.com\/ajax\/libs\/jquery\/1\//\/js\//g' > $filename 
	
	if [ $? = 0 ]; then

		echo "replaceing $filename done"
	else
		echo "replaceing $filename error"
	fi
done

find . -type f -name "*.bak" | xargs rm

rm -rf $$.txt

