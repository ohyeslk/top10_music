<?php


class iTunes
{
    const API_LOOKUP = 'http://itunes.apple.com/lookup?';
    const API_SEARCH = 'http://itunes.apple.com/search?';

    protected static $_lookup_config = array();
    protected static $_search_config = array();

    public static function config($index = array(), $value = null, $type = 'search')
    {
        if(!is_array($index))
        {
            $index = array($index => $value);
        }
        elseif(is_array($index) && $value !== null)
        {
            $type = $value;
        }

        if($type == 'lookup')
        {
            self::$_lookup_config = array_merge(self::$_lookup_config, $index);
        }
        else
        {
            self::$_search_config = array_merge(self::$_search_config, $index);
        }



    }

    public static function search($term, $by = null, array $config = array())
    {
        if(is_array($by))
        {
            $config = $by;
        }
        elseif($by !== null)
        {
            $config['attribute'] = $by;
        }

        $config['term'] = $term;
        $content = self::_get_content($config, 'search');

        return $content;
    }

    public static function lookup($term, $by = 'id', array $config = array())
    {
        $config[$by] = $term;
        $content = self::_get_content($config, 'lookup');

        return $content;
    }


    protected static function _get_content($config, $type = 'search')
    {
        if($type == 'lookup')
        {
            $url = self::API_LOOKUP;
        }
        else
        {
            $url = self::API_SEARCH;
        }

        $url .= http_build_query($config);

        $content = file_get_contents($url);
        $array = json_decode($content);

        return $array;
    }
}

function jsonRemoveUnicodeSequences($struct) {
   return preg_replace("/\\\\u([a-f0-9]{4})/e", "iconv('UCS-4LE','UTF-8',pack('V', hexdec('U$1')))", json_encode($struct));
}

if(isset($_POST['term']))
{
    $term = urlencode($_POST['term']); // user input 'term' in a form

    #$json =  file_get_contents('http://itunes.apple.com/search?term=Hozier&country=' . $term.'&limit=10&media=music&entity=musicArtist,musicTrack,album,mix,song');
    $json =  file_get_contents('https://itunes.apple.com/'. $term. '/rss/topsongs/limit=10/explicit=true/json');
    $array = json_decode($json, false);

    $i = 2;
    $images = array();
    $title_array = array();
    $music_files = array();
    if($array->feed->entry == null){
        $json =  file_get_contents('https://itunes.apple.com/us/rss/topsongs/limit=10/explicit=true/json');
        $array = json_decode($json, false);
    }
    foreach ($array->feed->entry as $entry){
        foreach($entry->title as $title){
            $title_array[] = $title;
        }
        foreach($entry-> {"im:image"} as $image) {
            if ($i % 3 == 0) {
                $images[] = $image->label;
            }
            $i++;
        }
         foreach($entry-> link as $link){
          foreach($link->attributes as $attributes){
            if(strlen($attributes) > 105){
              $music_files[] = $attributes;
            }
          }
        }
    }
   
    echo jsonRemoveUnicodeSequences($title_array);
    echo json_encode($images);
    echo json_encode($music_files);
}

if(isset($_POST['termFull']))
{
   $termFull = urlencode($_POST['termFull']); // user input 'term' in a form
   
   $url = "https://ajax.googleapis.com/ajax/services/search/images?" .
          "v=1.0&q=" . $termFull. "%20landmark&userip=AIzaSyA7uvd8L_H5xFZkk_3nCnrEzIES5vk3Ji8";
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($ch, CURLOPT_REFERER, 'http://smanoj.student.uscitp.com/MusicHackathon/');
      $body = curl_exec($ch);
      curl_close($ch);
      $json = json_decode($body, false);
      $googleimage = array();
      foreach($json->responseData->results as $responseData) {
          #var_dump($responseData);
          #echo $responseData->url;
          $googleimage[] = $responseData->url;
          break;
      }
   
    echo json_encode($googleimage);
}
?>