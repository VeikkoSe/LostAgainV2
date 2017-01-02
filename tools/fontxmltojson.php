<?php

$fontExp = file_get_contents("test.fnt");

$fontInfo = new SimpleXMLElement($fontExp);



//read the fontfile xml to allChars array where the key is the ascii code
$allchars = array();
foreach ($fontInfo->chars as $char) {
  foreach ($char->char as $row) {
    $r = array();
    $r['id'] = (string) $row->attributes()['id'];
    $r['x'] = (string) $row->attributes()['x'];
    $r['y'] = (string) $row->attributes()['y'];
    $r['width'] = (string) $row->attributes()['width'];
    $r['height'] = (string) $row->attributes()['height'];
    $r['xoffset'] = (string) $row->attributes()['xoffset'];
    $r['yoffset'] = (string) $row->attributes()['yoffset'];
    $r['xadvance'] = (string) $row->attributes()['xadvance'];
    $r['page'] = (string) $row->attributes()['page'];
    $r['chnl'] = (string) $row->attributes()['chnl'];
    $allchars[$r['id']] = $r;
  }
}
//we replace " with ' just to make JSHint happy :)
echo json_encode($allchars);
