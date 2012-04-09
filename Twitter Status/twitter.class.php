<?php

/*
  Author: Adrian Statescu
  Description: This class represent an prototype for sending the messanges that method updateStatus process this thing.
               use REST HTTP POST for sending the message Representational State Transfer
               data members: -username
                             -password
                             -host

               method: -constructor
                       -updateStatus
 
  Last Modified: 16:22PM
*/

    class Twitter {

          //data private members
          private $username;

          private $password;

          private $ch;

          private $twitterHost = "http://twitter.com/";

                  //constructor of class Twitter
                  public function __construct($username,$password) {

                         $this->username = $username;

                         $this->password = $password;

                         $this->ch = curl_init();

                         curl_setopt($this->ch,CURLOPT_VERBOSE,1);   

                         curl_setopt($this->ch,CURLOPT_RETURNTRANSFER,1);

                         curl_setopt($this->ch,CURLOPT_USERPWD,"$this->username:$this->password");

                         curl_setopt($this->ch,CURL_HTTP_VERSION, CURL_HTTP_VERSION_1_1);   

                         curl_setopt($this->ch,CURLOPT_POST, 1);   

                  }//end construct

                 public function _destruct() {

                        //close and clean up
                        curl_close($this->ch);

                 }//end destruct

                 //Method that process the message
                 public function updateStatus($stat) {

                        if(strlen($stat) < 1) {return false;}

                        $this->twitterHost .= "statuses/update.xml?status=". urlencode(stripslashes(urldecode($stat)));

                        curl_setopt($this->ch,CURLOPT_URL,$this->twitterHost);

                        //Execute and get the http code for to see if is succes or not
                        $result = curl_exec($this->ch);        

                        $resultStatus = curl_getinfo($this->ch);                  
                         
                        if($resultStatus['http_code'] == 200) {return 1;}

                                                else
                                                              {return 0;}  

                 } //end method
    }//end class


?>