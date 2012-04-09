<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>

  <title>Twitter Set Status</title>

  <style>

  body { background: #9ae4e8 url(bg.gif) fixed no-repeat top left;}

  #doc2 {background: #fff; border: 1px solid #fff;margin-top: 90px;width: 60%;border-radius: 10px;-moz-border-radius: 10px;-webkit-border-radius: 10px;margin: 150px;padding: 40px} 
  
  #ft{ margin-top: 8em; color:#999; font-size: 65%; padding: 1px;}
 
  #ft a{color: #9ae4e8;}

  #ft a:hover{background: #9ae4e8;color: #fff}

  span {background: transparent url(twitter_logo_header.png) no-repeat left top;width: 160px;height: 50px;position: absolute;left: 180px;top: 120px}

  textarea {border: 2px solid #ccc;}
  
  p strong {font-size: 20px;color: #333}

  p b {font-size: 20px;color: #9ae4e8}

  #submit{float: right;margin-right: 170px;border-radius: 10px;-moz-border-radius: 10px;-webkit-border-radius: 10px;padding: 10px;border: 1px solid #ccc;background: #ccc;color: #777;width: 100px;font-weight: bold}

  #submit:hover{background: #999;color: #fff;font-weight: bold}

  #counter{position: absolute;top: 210px;left: 570px;color: #ccc;font-family: sans-serif;font-size: 30px}

  #username,#password {margin: 0.2em;border: 1px solid #ccc;width: 143px}

  label {color: #888}

  </style>

  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
</head>
<body>
 
     <span></span>

     <div id="counter">140</div>

     <div id="doc2">

           <div id="hd"></div>

                <div id="bd">

                    <p><strong>What are you doing?</strong></b>

                 	<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
             
                              <textarea rows="3" cols="50" name="twitter_stat" id="twitter_stat"></textarea> 

                              <br/>

                              <label for="username">Username</label><input type="text" name="username" id="username" />

                              <label for="password">Password</label><input type="password" name="password" id="password" />

                              <input type="submit" name="submit" id="submit" value="update"/>

                        </form>

<?php

             require_once('twitter.class.php');

             if(isset($_POST['submit'])) {

                        if(isset($_POST['twitter_stat'])) {

                                 $message = $_POST['twitter_stat'];

                                            if(strlen($message) > 0) {

                                                  if(strlen($_POST['username']) > 0) {

                                                         $username = $_POST['username'];

                                                  } else {

                                                         $username = "thinkphp";
                                                  }

                                                  if(strlen($_POST['password']) > 0) {

                                                         $password = $_POST['password'];

                                                  } else {

                                                         $password = "adidas88";
                                                  }

                                                    //create an object Twitter that send the messange
                                                    $ob = new Twitter($username,$password); 
 
                                                    if($ob->updateStatus($message)) {

                                                             echo"<p><b>Update Successfully</b></p>";

                                                    } else {

                                                             echo"<p><b>Twitter is unavailable at this time!</b></p>";        
                                                    }

                                            } else {

                                                   echo"<p><b>I won`t send a blank message!</b></p>";
                                            } 

                        }//endif
             }//endif

?>



                </div> 


           <div id="ft">Written by <a href="http://twitter.com">Adrian Statescu.</a> Powered by Twitter</div>
     </div>



<script type="text/javascript">

(function(){

    var counterLimit = function(counter,status,max) {


              if(status.value.length > max) {

                       status.value = status.value.substr(0,max);

              } else {

                       counter.innerHTML = max - status.value.length;
              } 
    }

 

    var counter = document.getElementById('counter');

    var status = document.getElementById('twitter_stat');

        status.onkeyup = function() {

               counterLimit(counter,status,140);
        }

})();

</script>
  
</body>
</html>