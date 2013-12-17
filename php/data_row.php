<?php


sleep(1);

$page_size = $_GET['page_size'] ? $_GET['page_size'] : 10;

$html = array('count' => 0 , 'data' => array());
for($i = 0; $i < $page_size; $i++){

    $html['data'][] = '<tr>
                                     <td>&nbsp;</td>
                                     <td>业务部</td>
                                     <td>北京分公司</td>
                                     <td>唐笑笑</td>
                                     <td>正常</td>
                                     <td>唐笑笑</td>
                                     <td>2013-12-13</td>
                                     <td>
                                         <span><a href="" class="ac-edit text2">编辑</a></span>
                                         <span><a href="" class="ac-remind text2">关闭</a></span>
                                     </td>
                                 </tr>';

}


$html['count'] = count($html['data']);

header("Content-Type:text/html");

echo join($html['data'],"");
//echo json_encode($html);
