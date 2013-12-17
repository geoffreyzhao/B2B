<?php


sleep(3);

$page_size = $_GET['page_size'] ? $_GET['page_size'] : 10;

$html = array('count' => 0 , 'data' => array());
for($i = 0; $i < $page_size; $i++){

    $html['data'][] = '<tr><td>'. date("Y-m-d h:i:s") . '</td></tr>';

}


$html['count'] = count($html['data']);

header("Content-Type:text/html");

echo join($html['data'],"");
//echo json_encode($html);
