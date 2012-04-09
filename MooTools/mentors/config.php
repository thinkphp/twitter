<?php

$arr = array("codepo8"        => "Christian Heilmann",
             "ded"            => "Dustin Diaz", 
             "davidwalshblog" => "David Walsh",
             "cpojer"         => "Chris Pojer",
             "mootools"       => "My Favorite Framework","salexsorin"=>"Sorin Statescu");

$out = "{";
foreach($arr as $key=>$value) {
        $out .= '"'. $key . '": "'. $value . '",';
}
$out .= "}";
?>