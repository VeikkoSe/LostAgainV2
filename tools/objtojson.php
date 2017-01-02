<?php
include ('class/ReadObjFile.php');

$file = $argv[1];
$r = new ReadObjFile($file);
$arr = $r->dataToArray();

$f = explode(".", $file);
$newFile = $f[0] . "." . "json";

echo $newFile . " created!";
file_put_contents($newFile, json_encode($arr));

