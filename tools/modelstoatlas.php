<?php
require('class/AtlasPack.php');

$imagePath    = "../resources/image/";
$modelPath    = "../resources/model/";
$buildPath    = "../resources/build/";




$atlasPack = new AtlasPack($imagePath,$modelPath,$buildPath);
$atlasPack->clearBuild();
$atlasPack->pack();




