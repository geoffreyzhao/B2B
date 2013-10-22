<?php

$orderType = array(
    'flowOrderTypes' =>  array(
        array(
            'orderTypeKey' => 'all', 
            'orderTypeValue' => '预订' 
        ),
        array(
            'orderTypeKey' => 'review', 
            'orderTypeValue' => '审核' 
        ),
        array(
            'orderTypeKey' => 'issue', 
            'orderTypeValue' => '出票' 
        )
    )
);

header("Content-Type: text/json");

echo json_encode($orderType);
