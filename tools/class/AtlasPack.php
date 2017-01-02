<?php

class AtlasPack {

  private $maxImageSize = 2048;
  private $imagePath;
  private $imageOutPath;
  private $positionFile;
  private $modelPath;
  private $modelOutPath;

  public function __construct($imagePath, $modelPath,$buildPath) {
    $this->imagePath = $imagePath;
    $this->modelPath = $modelPath;
    $this->buildPath = $buildPath;
    $this->imageOutPath = $buildPath.'image/';
    $this->positionFile = $buildPath.'positions.json';
    $this->modelOutPath = $buildPath.'model/';
    
  }
  
  public function clearBuild() {
    
    if(empty($this->buildPath)) {
      exit('emtpy buildPatj');
    }
    if(!is_dir($this->buildPath)) {
      exit('buildfolder is not a folder');
    }
    if(strpos($this->buildPath,'/build/')===false) {
      exit('buildfoder path needs to containt "/build/"');
    }
      
      exec("rm -Rf {$this->buildPath}*");
      exec("mkdir {$this->imageOutPath}");
      exec("mkdir {$this->modelOutPath}");
      
    
  }

  public function pack() {

    $allSlots = [];

    $allSlots[0][] = ['x' => 0, 'y' => 0, 'x2' => $this->maxImageSize, 'y2' => $this->maxImageSize, 'imageName' => false];


    //$maxDimension = 0;
    //$maxWidth = 0;
    //$row = 0;
    //$lastrow = 0;
    //$allUsed = false;

    $imageArray = $this->getImages($this->imagePath);

    foreach ($imageArray as $size => $images) {
      foreach ($images as $image) {

        $image['size'] = $size;
        $this->createSlotArray($image, $allSlots);
      }
    }

    $positions = [];
    foreach ($allSlots as $imageNumber => $slotArray) {
      $dest_img = imagecreatetruecolor($this->maxImageSize, $this->maxImageSize) or die('Cannot Initialize new GD image stream');
      $filename = $this->imageOutPath . "out" . $imageNumber . ".png";
      foreach ($slotArray as $slot) {

        if (empty($slot['imageName'])) {
          continue;
        }

        $positions[] = ['imageName' => $slot['imageName'], 'atlasName' => "out" . $imageNumber . ".png", 'x' => $slot['x'], 'y' => $slot['y'], 'size' => $slot['x2'] - $slot['x']];
        $source_img = imagecreatefrompng($this->imagePath . $slot['imageName'] . '.png');
        imageflip($source_img, IMG_FLIP_VERTICAL);
        imagecopymerge($dest_img, $source_img, $slot['x'], $slot['y'], 0, 0, $slot['x2'] - $slot['x'], $slot['y2'] - $slot['y'], 100);
      }

      imagepng($dest_img, $filename);
      imagedestroy($dest_img);
    }

    file_put_contents($this->positionFile, json_encode($positions));

    $this->convertMeshTextureToAtlas($positions);
  }

  private function getImages($path) {

    $images = scandir($path);
    $imagesBySize = [];

    foreach ($images as $image) {
      if ($image === '.' || $image === '..') {
        continue;
      }

      $imageData = getimagesize($path . $image);


      $ip = explode('.', $image);
      if (empty($imageData)) {
        continue;
      }

      $width = $imageData[0];
      $height = $imageData[1];
      if ($width != $height) {
        exit("not symmetric image: " . $image);
      }
      if ($width % 2 != 0) {
        exit("not power of two: " . $image);
      }

      if ($width > $this->maxImageSize) {
        exit("too large image: " . $image);
      }

      $imagesBySize[$width][] = ['image' => $ip[0], 'size' => $width, 'x' => false, 'y' => false, 'number' => false];
    }

    krsort($imagesBySize);
    return $imagesBySize;
  }

  private function createSlotArray($image, &$allSlots) {

    foreach ($allSlots as $slotIndex => $slotArray) {
      $full = true;
      foreach ($slotArray as $i => $slot) {

        if ($slot['imageName'] !== false) {
          continue;
        }
        $full = false;

        $xfilled = false;
        $yfilled = false;

        if ($slot['x'] + $image['size'] == $slot['x2']) {
          $xfilled = true;
        }
        if ($slot['y'] + $image['size'] == $slot['y2']) {
          $yfilled = true;
        }

        if ($yfilled && $xfilled) {
          $allSlots[$slotIndex][$i]['imageName'] = $image['image'];
          return;
        }

        if ($xfilled) {

          $allSlots[$slotIndex][$i]['imageName'] = $image['image'];

          $allSlots[$slotIndex][$i]['x2'] = $slot['x'] + $image['size'];
          $allSlots[$slotIndex][$i]['y2'] = $slot['y'] + $image['size'];

          $allSlots[$slotIndex][] = ['x' => $slot['x'], 'y' => $slot['y'] + $image['size'], 'x2' => $slot['x2'], 'y2' => $slot['y2'], 'imageName' => false];
          return;
        }

        if (!$yfilled && !$xfilled) {

          $allSlots[$slotIndex][$i]['imageName'] = $image['image'];
          $allSlots[$slotIndex][$i]['x2'] = $slot['x'] + $image['size'];
          $allSlots[$slotIndex][$i]['y2'] = $slot['y'] + $image['size'];

          $allSlots[$slotIndex][] = ['x' => $slot['x'], 'y' => $slot['y'] + $image['size'], 'x2' => $slot['x'] + $image['size'], 'y2' => $slot['y2'], 'imageName' => false];
          $allSlots[$slotIndex][] = ['x' => $slot['x'] + $image['size'], 'y' => $slot['y'], 'x2' => $slot['x2'], 'y2' => $slot['y2'], 'imageName' => false];

          return;
        }
      }
    }
    if ($full) {
      $allSlots[][] = ['x' => 0, 'y' => 0, 'x2' => $this->maxImageSize, 'y2' => $this->maxImageSize, 'imageName' => false];
      $this->createSlotArray($image, $allSlots, $this->maxImageSize);
    }
  }

  private function convertMeshTextureToAtlas($atlasInfo) {

    $meshfiles = scandir($this->modelPath);

    $part = 1 / $this->maxImageSize;

    foreach ($meshfiles as $meshfile) {
      if ($meshfile === '.' || $meshfile === '..') {
        continue;
      }

      $filename = explode('.', $meshfile)[0];
      $json = json_decode(file_get_contents($this->modelPath . $meshfile));

      /*
        texturecoordinates  = JSON.parse('[ "1.0","0.0",' +
        '"1.0","0.5",' +
        '"0.5","0.0",' +
        '"1.0","0.5",' +
        '"0.5","0.5",' +
        '"0.5","0.0"]');
       */


      foreach ($atlasInfo as $fileInAtlas) {

        if ($fileInAtlas['imageName'] !== $filename) {
          continue;
        }

        $lc = 1;
        $tc = [];



        foreach ($json->texturecoordinates as $i => $textureCO) {
          $scale = $fileInAtlas['size'] / $this->maxImageSize;

          //texture ooordinates are written in pairs of two. first x then y
          if ($lc % 2 === 0) {
            $newCO = (string) number_format(($part * $fileInAtlas['y'] + ($scale * $textureCO)), 10);
          }
          else {
            $newCO = (string) number_format(($part * $fileInAtlas['x'] + ($scale * $textureCO)), 10);
          }
          $tc[] = $newCO;
          $lc++;
        }


        $json->texturecoordinates = $tc;

        file_put_contents($this->modelOutPath . $meshfile, json_encode($json));
      }
    }
  }

}
