<?php

require_once('configuration.php');

if(isset($_GET['action']) && isset($_GET['id']) && isset($_GET['name'])) {

$command = $_GET['action'];

$id      = $_GET['id'];

$name    = $_GET['name'];

         switch($command) {

                    case 'add':

                    echo"<pre>";
                    print_r(Configuration::getInstance()->set($id,$name));
                    echo"</pre>";

                    break;

                    case 'ren':

                    echo"<pre>"; 
                    print_r(Configuration::getInstance()->set($id,$name));
                    echo"</pre>";

                    break;

                    case 'del':

                    break; 
         }
} else {
   
  display_form();

}

function display_form() {

echo <<< FORM
<h1>Add/Update/Delete User Accounts</h1>
<form action="commands.php" method="get" id="f">
<div><label for="id">Twitter User</label><input type="text" name="id" id="id"/></div>
<div><label for="name">Real Name</label><input type="text" name="name" id="name"/></div>
<div><input type="hidden" name="action" value="add"/></div>
<div><input type="submit" value="action" id="s"/></div>
</form>
FORM;

}
          
?>
<style type="text/css">
 /* start CSS FORM */
   form{-moz-border-radius:10px;-webkit-border-radius:10px;background:#205D69;color:#fff;  width:18em;  margin:1em 0;  font-weight:bold;padding:1em;-moz-box-shadow:4px 4px 10px rgba(33,33,33,.8);-webkit-box-shadow:4px 4px 10px rgba(33,33,33,.8);}
   form label{float: left;width: 8em;}
   form div{overflow: hidden;padding: .2em;}
   form input[id=caption],form input[id=values],form input[id=names]{width: 300px}
   form input[id=width],form input[id=height]{width: 30px}
   input[type="submit"]       { cursor:pointer;border:1px solid #999;padding:5px;-moz-border-radius:4px;background:#eee;-webkit-border-radius:4px;border-radius: 4px}
   input[type="submit"]:hover,input[type="submit"]:focus { border-color:#333;background:#ddd; }
 /* end CSS FORM */
</style>