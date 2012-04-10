<?php

    class Configuration {

          //static instance for singleton
          static private $instance = NULL;

          //flag that indicate if the file ini is affected or not
          private $updated = false;

          // array settings
          private $settings = array();

          //the name file configuration
          const path = 'config/config.ini';

          //constructor of class that is private parce que we use singleton and accepts only instance
          private function __construct() {

                  if(file_exists(self::path)) {

                         $this->settings = parse_ini_file(self::path); 
                  }
          } 

          //this method accepts only instance
          public static function getInstance() {

                 if(self::$instance == NULL) {

                        self::$instance = new Configuration();    
                 }

             return self::$instance;
          }

          //destructor of class
          public function __destruct() {

                 if(!$this->updated) {

                      return false;
                 }

                 //prepare the file for write
                 $fp = fopen($this->_getPath(), "w");

                 if(!$fp) {

                    return false; 
                 } 

                 foreach($this->settings as $id=>$name) {

                         fputs($fp, "$id = \"$name\"\n");
                 }

                 fclose($fp);
          }

          //getter method
          public function get($id) {

                 if(isset($this->settings[$id])) {

                      return $this->settings[$id];
                 }
              return null;
          }

          //setter method
          public function set($id,$name) {
 
                 if(!isset($this->settings[$id]) || $this->settings[$id] != $name) {

                     $this->settings[$id] = $name;

                     $this->updated = true;

                    return array($id, $name);
                 }

              return null; 
          }

          //get array of id=>realname
          public function getSettings() {

                 return $this->settings;
          } 

          private function _getPath() { 

                  $this->saveConfig = str_replace('commands.php', '', $_SERVER['SCRIPT_FILENAME']);

                  $this->saveConfig = $this->saveConfig . self::path; 

               return $this->saveConfig;  
          }

    }

?>