<?php

/*
TODO:
https://www.bing.com/maps/embed-a-map
https://developers.google.com/maps/documentation/maps-static/intro
https://wiki.openstreetmap.org/wiki/OpenLinkMap#Embed_map_in_another_website

embed via iframe:
  - bing
  - osm?
javascript api:
  - all
*/

return [

    /*
     |----------------------------------------------------------------------
     | Map Default
     |----------------------------------------------------------------------
     |
     | TODO
     | Available maps: 'google', 'osm', 'bing', 'mapkit'
     |
     */

    'default' => 'osm',

    /*
     |--------------------------------------------------------------------------
     | Maps Enabled
     |--------------------------------------------------------------------------
     |
     | By default, Maps is enabled. You can set the value to false to disable
     | rendering of the map.
     |
     */

    'enabled' => env('MAPS_ENABLED', true),


    'maps' => [

        'google' => [
            // https://developers.google.com/maps/documentation/javascript/get-api-key
            // https://developers.google.com/maps/documentation/embed/get-api-key
            'key' => env('MAPS_GOOGLE_KEY'),
        ],

        'bing' => [
            // https://msdn.microsoft.com/en-us/library/ff428642.aspx
            // https://www.bingmapsportal.com
            'key' => env('MAPS_BING_KEY'),
        ],

        'osm' => [
            'tiles' => 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        ],

        'mapkit' => [
            // https://developer.apple.com/videos/play/wwdc2018/508
            'key' => env('MAPS_MAPKIT_KEY'),
        ],

    ],

];
