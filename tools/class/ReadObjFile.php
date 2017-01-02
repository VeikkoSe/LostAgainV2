<?php


class ReadObjFile {

  private $v = array();
  private $vt = array();
  private $vn = array();
  private $faces = array();
  private $indexedArray = array();
  private $indices = array();
  private $vertexCount = 0;
  private $textureCoordCount = 0;
  private $normalCount = 0;

  public function __construct($objFile) {
    $this->objFile = $objFile;

  }

  private function isclose($a, $b) {

    if (strpos($a, "-") === 0 && strpos($b, "-") !== 0) {
      return false;
    }
    if ($a + 0.01 >= $b && $a - 0.01 <= $b) {
      return true;
    }
    return false;
  }

  private function alreadyInserted($row) {

    if (empty($this->indexedArray)) {
      return false;
    }

    foreach ($this->indexedArray as $index => $alreadyAdded) {

      if ($this->isclose($alreadyAdded['v'][0], $row['v'][0]) &&
              $this->isclose($alreadyAdded['v'][1], $row['v'][1]) &&
              $this->isclose($alreadyAdded['v'][2], $row['v'][2]) &&
              $this->isclose($alreadyAdded['vt'][0], $row['vt'][0]) &&
              $this->isclose($alreadyAdded['vt'][1], $row['vt'][1]) &&
              $this->isclose($alreadyAdded['vn'][0], $row['vn'][0]) &&
              $this->isclose($alreadyAdded['vn'][1], $row['vn'][1]) &&
              $this->isclose($alreadyAdded['vn'][2], $row['vn'][2])
      ) {
        $ret = array();
        $ret['data'] = $this->indexedArray[$index];
        $ret['index'] = $this->indices[$index];

        return $ret;
      }
    }


    return false;
  }

  private function buildIndexBuffer() {

    $i = 0;

    foreach ($this->ret as $i => $row) {
      $ins = $this->alreadyInserted($row);

      if ($ins) {
        $this->indexedArray[] = $ins['data'];
        $this->indices[] = $ins['index'];
      }
      else {
        $this->indexedArray[] = $row;
        $this->indices[] = $i;
        $i++;
      }
    }
  }

  private function addVertex($x, $y, $z) {

    $this->v[$this->vertexCount][0] = trim($x);
    $this->v[$this->vertexCount][1] = trim($y);
    $this->v[$this->vertexCount][2] = trim($z);
    $this->vertexCount++;
  }

  private function addTextureCoord($x, $y) {
    $this->vt[$this->textureCoordCount][0] = trim($x);
    $this->vt[$this->textureCoordCount][1] = trim($y);
    $this->textureCoordCount++;
  }

  private function addNormal($x, $y, $z) {
    $this->vn[$this->normalCount][0] = trim($x);
    $this->vn[$this->normalCount][1] = trim($y);
    $this->vn[$this->normalCount][2] = trim($z);
    $this->normalCount++;
  }

  private function addFace($x, $y, $z) {
    $s1 = explode("/", trim($x));
    $s2 = explode("/", trim($y));
    $s3 = explode("/", trim($z));
    $this->faces[] = [$s1, $s2, $s3];
  }

  private function buildRet() {
    $i = 0;
    foreach ($this->faces as $face) {
      foreach ($face as $part) {
        $this->ret[$i]['v'] = $this->v[$part[0] - 1];
        $this->ret[$i]['vt'] = $this->vt[$part[1] - 1];
        $this->ret[$i]['vn'] = $this->vn[$part[2] - 1];
        $i++;
      }
    }
  }

  private function readData() {

    if(!is_file($this->objFile)) {
      exit("not a valid file");
    }
    $rows = file($this->objFile);

    foreach ($rows as $r) {
      $row = explode(" ", $r);

      if ($row[0] == "v") {
        $this->addVertex($row[1], $row[2], $row[3]);
      }
      else if ($row[0] == "vt") {
        $this->addTextureCoord($row[1], $row[2]);
      }
      else if ($row[0] == "vn") {
        $this->addNormal($row[1], $row[2], $row[3]);
      }
      else if ($row[0] == "f") {
        $this->addFace($row[1], $row[2], $row[3]);
      }
    }

    $this->buildRet();
  }

  private function getConvertedData() {
    return [$this->indexedArray, $this->indices];
  }

  public function dataToArray() {
    
    $this->readData();

    $this->buildIndexBuffer();

    $cd = $this->getConvertedData();

    $arr = [];

    $arr['indices'] = $cd[1];
    //unset($cd['indices']);

    foreach ($cd[0] as $row) {
      $arr['vertices'][] = $row['v'][0];
      $arr['vertices'][] = $row['v'][1];
      $arr['vertices'][] = $row['v'][2];

      $arr['texturecoordinates'][] = $row['vt'][0];
      $arr['texturecoordinates'][] = $row['vt'][1];

      //$arr['normals'][] = $row['vn'][0];
      //$arr['normals'][] = $row['vn'][1];
      //$arr['normals'][] = $row['vn'][2];
    }

    $arr['normals'] = $this->reCreateNormals($arr['vertices'], $arr['indices']);


    $fileName = explode(".", $this->objFile);


    $arr['ambient'] = array(0.5, 0.5, 0.5);
    $arr['diffuse'] = array(0.9, 0.9, 0.9);
    $arr['specular'] = array(1.0, 1.0, 1.0);
    $arr['x'] = 0;
    $arr['y'] = 0;
    $arr['z'] = 0;
    $arr['name'] = $fileName[0];
    return $arr;
  }

  public function reCreateNormals($vertices, $indices) {
    $x = 0;
    $y = 1;
    $z = 2;

    $normals = [];
    for ($h = 0; $h < count($vertices); $h++) {
      //for each vertex, initialize normal x, normal y, normal z
      $normals[] = 0.0;
    }

    for ($i = 0; $i < count($indices); $i = $i + 3) { //we work on triads of vertices to calculate normals so i = i+3 (i = indices index)
      $v1 = [];
      $v2 = [];
      $normal = [];
      //p1 - p0
      $v1[$x] = $vertices[3 * $indices[$i + 1] + $x] - $vertices[3 * $indices[$i] + $x];
      $v1[$y] = $vertices[3 * $indices[$i + 1] + $y] - $vertices[3 * $indices[$i] + $y];
      $v1[$z] = $vertices[3 * $indices[$i + 1] + $z] - $vertices[3 * $indices[$i] + $z];
      // p0 - p1
      $v2[$x] = $vertices[3 * $indices[$i + 2] + $x] - $vertices[3 * $indices[$i + 1] + $x];
      $v2[$y] = $vertices[3 * $indices[$i + 2] + $y] - $vertices[3 * $indices[$i + 1] + $y];
      $v2[$z] = $vertices[3 * $indices[$i + 2] + $z] - $vertices[3 * $indices[$i + 1] + $z];

      //cross product by Sarrus Rule
      $normal[$x] = $v1[$y] * $v2[$z] - $v1[$z] * $v2[$y];
      $normal[$y] = $v1[$z] * $v2[$x] - $v1[$x] * $v2[$z];
      $normal[$z] = $v1[$x] * $v2[$y] - $v1[$y] * $v2[$x];

      // ns[3*ind[i]+x] += normal[x];
      // ns[3*ind[i]+y] += normal[y];
      // ns[3*ind[i]+z] += normal[z];
      for ($j = 0; $j < 3; $j++) { //update the normals of that triangle: sum of vectors
        $normals[3 * $indices[$i + $j] + $x] = $normals[3 * $indices[$i + $j] + $x] + $normal[$x];
        $normals[3 * $indices[$i + $j] + $y] = $normals[3 * $indices[$i + $j] + $y] + $normal[$y];
        $normals[3 * $indices[$i + $j] + $z] = $normals[3 * $indices[$i + $j] + $z] + $normal[$z];
      }
    }
//normalize the result
    for ($g = 0; $g < count($vertices); $g = $g + 3) { //the increment here is because each vertex occurs with an offset of 3 in the array (due to x, y, z contiguous values)
      $nn = [];
      $nn[$x] = $normals[$g + $x];
      $nn[$y] = $normals[$g + $y];
      $nn[$z] = $normals[$g + $z];

      $len = sqrt(($nn[$x] * $nn[$x]) + ($nn[$y] * $nn[$y]) + ($nn[$z] * $nn[$z]));
      if ($len === (float) 0) {
        $len = 0.00001;
      }

      $nn[$x] = $nn[$x] / $len;
      $nn[$y] = $nn[$y] / $len;
      $nn[$z] = $nn[$z] / $len;

      $normals[$g + $x] = $nn[$x];
      $normals[$g + $y] = $nn[$y];
      $normals[$g + $z] = $nn[$z];
    }

    return $normals;
  }

}
