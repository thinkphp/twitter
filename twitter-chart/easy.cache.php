<?php

interface ICache {

     function getCache($label);
     function setCache($label,$data);
     function isCached($label);
}

class EasyCache implements ICache {

      public $cache_age = 3600;//default 1 hour to cache  

      const cache_path = 'cache/';//default to 'cache'

      public function __construct($hours=5) {

             $this->cache_age = $hours*60*60;

             if(!is_dir(self::cache_path)) {

                 mkdir(self::cache_path,0777);
             }
      }

      public function __destruct() {}

      public function getData($label,$url,$callback=NULL) {

             $data = $this->getCache($label);

             if($data) {

                return $data;

             } else {

                if(!is_null($callback)) {

                    $data = call_user_func($callback,$url);

                } else {

                    $data = $this->_execute($url);
                }
                    $this->setCache($label,$data);

               return $data;
             }
      } 
      
      public function getCache($label) {

             if($this->isCached($label)) {

                $file_cache = self::cache_path . $this->safeFilename($label) . '.cache';

               return file_get_contents($file_cache);   
             }
         return false;
      }

      public function setCache($label,$data) {

             file_put_contents(self::cache_path . $this->safeFilename($label). '.cache',$data);
      }

      public function isCached($label) {
               
             $file_cache = self::cache_path . $this->safeFilename($label) . '.cache';

             $expire_time = $this->cache_age;
             $current_time = time();
             $file_time = @filemtime($file_cache); 

             if(file_exists($file_cache) && (($current_time-$file_time) < $expire_time)) {
                   return true; 
             }
         return false;
      }

      private function _execute($url) {

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            $out = curl_exec($ch);
            curl_close($ch);
            if(empty($out)) {
               return "Timeout service"; 
            } else {
               return $out;
            }
      } 

      private function safeFilename($file) {

              return preg_replace('/[^0-9a-z\.\_\-]/','',$file);
      }
}
?>