<?php


sleep(1);

@$page_size = $_GET['page_size'] ? $_GET['page_size'] : 10;

$html = array('count' => 0 , 'data' => array());
for($i = 0; $i < $page_size; $i++){

    $html['data'][] = '<tr>
                                     <td><input id="" type="checkbox" name=""></td>
                                     <td>潘大大</td>
                                     <td>xiachen.pan@travelzen.com</td>
                                     <td>北京分公司</td>
                                     <td>第一级</td>
                                     <td>正常</td>
                                     <td>管理员</td>
                                     <td>唐笑笑</td>
                                     <td>
                                         <span class="hyper-link"><u>操作</u>
                                             <i class="arrow-down"></i>
                                             <div class="hyper-text">
		     <a href="#">编辑</a>
		     <a href="#" class="link_setApprover">设置审批人</a>
                                                 <a href="#">转调</a>
                                                 <a href="#" class="ac-freeze">冻结</a>
                                                 <a href="#" class="ac-delete">删除</a>
                                             </div>
                                         </span>
                                         <span><a href="" class="text2">详情</a></span>
                                     </td>
                                 </tr>';

}


$html['count'] = count($html['data']);

header("Content-Type:text/html");

echo join($html['data'],"");
//echo json_encode($html);
