<?php

require_once('configuration.php');

$arr = Configuration::getInstance()->getSettings();

$out = "{";

foreach($arr as $key=>$value) {

        $out .= '"'. $key . '": "'. $value . '",';
}

$out .= "}";

class DIVs {
      public $arr;
      public function __construct($arr) {
             $this->arr = $arr;
      }
      public function __toString() {
             $div = '<div id="container">';
             foreach($this->arr as $id=>$name) {
                     $div .= "<div id='$id'></div>";
             }
             $div .= '</div>';  
           return $div;
      }
}

$thedivs = new DIVs($arr);
?>