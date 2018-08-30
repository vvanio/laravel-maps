# Maps for your Laravel application

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
