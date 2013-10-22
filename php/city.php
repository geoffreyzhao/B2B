<?php

$city = array(

    'd' => array(
        'results' => array(
            array(
                'airLineCode' => 'AM',
                'cnName' => '墨西哥航空'
            ),
            array(
                'airLineCode' => 'AZ',
                'cnName' => '意大利航空'
            ),
            array(
                'airLineCode' => 'AY',
                'cnName' => '芬兰航空'
            ),
            array(
                'airLineCode' => 'AA',
                'cnName' => '美国航空'
            )
        )

    ),
    '__count' => 4 

);
header("Content-type: text/javascript; charset=UTF-8");

echo $_GET['$callback'] . '(' . json_encode($city) . ')';
