# Maps for your Laravel application

[![GitLab Repository](https://img.shields.io/badge/GitLab-gonoware/laravel--maps-blue.svg?logo=gitlab&style=flat-square&longCache=true)](https://gitlab.com/gonoware/laravel-maps)
[![Laravel Version](https://img.shields.io/badge/Laravel-5.5-blue.svg?logo=laravel&style=flat-square&longCache=true)]()
[![Latest Stable Version](https://poser.pugx.org/gonoware/laravel-maps/v/stable?format=flat-square)](https://packagist.org/packages/gonoware/laravel-maps)
[![StyleCI](https://gitlab.styleci.io/repos/8146646/shield)](https://gitlab.styleci.io/repos/8146646)
[![License](https://poser.pugx.org/gonoware/laravel-maps/license?format=flat-square)](https://packagist.org/packages/gonoware/laravel-maps)
[![Total Downloads](https://poser.pugx.org/gonoware/laravel-maps/downloads?format=flat-square)](https://packagist.org/packages/gonoware/laravel-maps)

Using this package you can easily display maps on your website.

Supported map services: 
 * Google Maps
 * OpenStreetMap
 * Bing Maps
 * MapQuest
 * Yandex Maps
 * MapKit (beta)

> Note: Yandex Maps API does not work in Chrome.

## Installation

This package can be installed through Composer.
```bash
composer require gonoware/laravel-maps
```
Laravel 5.5 uses Package Auto-Discovery, so doesn't require you to manually add 
the ServiceProvider.

Publish the compiled assets to `public/vendor/maps` with one of these 
commands:
```bash
php artisan vendor:publish --tag=maps
```
```bash
php artisan vendor:publish --provider="GoNoWare\Maps\MapsServiceProvider" --tag=public
```
> When updating, use the `--force` switch to overwrite existing assets:
```bash
php artisan vendor:publish --tag=maps --force
```

Optionally, you can also publish the config file of this package with this 
command to `config/vendor/maps.php`:
```bash
php artisan vendor:publish --provider="GoNoWare\Maps\MapsServiceProvider" --tag=config
```


## Usage

Load the map styles by adding the following directive to your
Blade template before the `</head>` closing tag.
```php
@mapstyles
```

Then add the following directive to your Blade template
before the `</body>` closing tag, to load the map scripts.
```php
@mapscripts
```

Display a map by adding the `@map` directive to your Blade template.
```php
@map([
    'lat' => '48.134664',
    'lng' => '11.555220',
    'zoom' => '6'
])
```
You can also show markers/pins/annotations:
```php
@map([
    'lat' => '48.134664',
    'lng' => '11.555220',
    'zoom' => '6'
    'markers' => [[
        'title' => 'Go NoWare',
        'lat' => '48.134664',
        'lng' => '11.555220',
    ]],
])
```

Open a url when a marker is clicked
```php
@map([
    'lat' => '48.134664',
    'lng' => '11.555220',
    'zoom' => '6'
    'markers' => [[
        'title' => 'Go NoWare',
        'lat' => '48.134664',
        'lng' => '11.555220',
        'url' => 'https://gonoware.com',
    ]],
])
```

## Customization

To adjust the height of the map use CSS:
```css
.gnw-map-service {
    height: 750px;
}
```

Change the background of the map container:
```css
.gnw-map-service__osm {
    background: rgb(221, 221, 221);
}
```

Fade in by default when using Bootstrap 3.3.7 or 4+. To replicate or modify the animation use following CSS:
```css
.gnw-map.fade {
    transition: opacity .15s linear;
}
.gnw-map.fade:not(.show) {
    opacity: 0;
}
```
