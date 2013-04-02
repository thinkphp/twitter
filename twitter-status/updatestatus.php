<?php

sleep(1);

             require_once('twitter.class.php');

             if(isset($_POST['send'])) { 

                        if(isset($_POST['text'])) {

                                 $message = $_POST['text'];

                                            if(strlen($message) > 0) {

                                                  if(strlen($_POST['username']) > 0) {

                                                         $username = $_POST['username'];

                                                  } else {

                                                         $username = "thinkphp";
                                                  }

                                                  if(strlen($_POST['password']) > 0) {

                                                         $password = $_POST['password'];

                                                  } else {

                                                         $password = "xxxxxxxxx";
                                                  }

                                                    //create an object Twitter that send the messange
                                                    $ob = new Twitter($username,$password); 
 
                                                    if($ob->updateStatus($message)) {

                                                             echo"Update Successfully";

                                                    } else {

                                                             echo"Twitter is unavailable at this time!";        
                                                    }


                                            } else {

                                                   echo"I won`t send a blank message!";
                                            } 

                        }//endif 
 
             }//endif



?>