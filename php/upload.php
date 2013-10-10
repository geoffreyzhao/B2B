<?php

// $uploaddir = "./";
// $file = $_FILES['Filedata'];

if(isset($_FILES['Filedata'])){
    $target = "/tmp/".$_FILES['Filedata']['name'];

    if(move_uploaded_file($_FILES['Filedata']['tmp_name'],$target))
    {
        echo '//devel/tmp/'.$_FILES['Filedata']['name'];//$chmod o+rw galleries
    }
    else{
        echo "wrong";
    }
}

// Usage: uploadfile($_FILE['file']['name'],'temp/',$_FILE['file']['tmp_name'])
function uploadfile($origin, $dest, $tmp_name)
{
    echo $origin;
    echo $dest;
    echo $tmp_name;
    $origin = strtolower(basename($origin));
    $fulldest = $dest.$origin;
    $filename = $origin;
    for ($i=1; file_exists($fulldest); $i++)
    {
        $fileext = (strpos($origin,'.')===false?'':'.'.substr(strrchr($origin, "."), 1));
        $filename = substr($origin, 0, strlen($origin)-strlen($fileext)).'['.$i.']'.$fileext;
        $fulldest = $dest.$newfilename;
    }

    if (move_uploaded_file($tmp_name, $fulldest))
        return $filename;
    return false;
}

/*
$allowedExts = array("gif", "jpeg", "jpg", "png");
$temp = explode(".", $_FILES["file"]["name"]);
$extension = end($temp);
if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/jpg")
|| ($_FILES["file"]["type"] == "image/pjpeg")
|| ($_FILES["file"]["type"] == "image/x-png")
|| ($_FILES["file"]["type"] == "image/png"))
&& ($_FILES["file"]["size"] < 20000)
&& in_array($extension, $allowedExts))
  {
  if ($_FILES["file"]["error"] > 0)
    {
    echo "Return Code: " . $_FILES["file"]["error"] . "<br>";
    }
  else
    {
    echo "Upload: " . $_FILES["file"]["name"] . "<br>";
    echo "Type: " . $_FILES["file"]["type"] . "<br>";
    echo "Size: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
    echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br>";

    if (file_exists("upload/" . $_FILES["file"]["name"]))
      {
      echo $_FILES["file"]["name"] . " already exists. ";
      }
    else
      {
      move_uploaded_file($_FILES["file"]["tmp_name"],
      "upload/" . $_FILES["file"]["name"]);
      echo "Stored in: " . "upload/" . $_FILES["file"]["name"];
      }
    }
  }
else
  {
  echo "Invalid file";
  }
?>
