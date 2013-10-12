<?php

if(isset($_FILES['Filedata'])){
    $target = "/tmp/".$_FILES['Filedata']['name'];

    if(move_uploaded_file($_FILES['Filedata']['tmp_name'],$target))
    {
        echo '//'.$_SERVER['SERVER_NAME'].'/php/tmp/'.$_FILES['Filedata']['name'];//$chmod o+rw galleries
    }
    else{
        echo "wrong";
    }
}
