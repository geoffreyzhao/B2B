<?php




switch($_GET['orderType']){


case 'all':
    $orderStat = array(
        'flowOrderStat' =>  array(
            array(
                'orderStatKey' => 'issue_ing', 
                'orderStatValue' => '出票中' 
            ),
            array(
                'orderStatKey' => 'check_ing', 
                'orderStatValue' => '审核中' 
            ),
            array(
                'orderStatKey' => 'check_cmp', 
                'orderStatValue' => '审核完成' 
            )
        )
    );

    break;

case 'review':
    $orderStat = array(
        'flowOrderStat' =>  array(
            array(
                'orderStatKey' => 'check_ing', 
                'orderStatValue' => '审核中' 
            ),
            array(
                'orderStatKey' => 'check_cmp', 
                'orderStatValue' => '审核完成' 
            )
        )
    );
    break;
case 'issue':
    $orderStat = array(
        'flowOrderStat' =>  array(
            array(
                'orderStatKey' => 'issue_ing', 
                'orderStatValue' => '出票中' 
            )
        )
    );
    break;
}

header("Content-Type: text/json");
echo json_encode($orderStat);
