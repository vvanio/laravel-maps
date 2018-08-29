
Publish assets to `public/vendor/maps/{css,js}`
```bash
php artisan vendor:publish --provider="GoNoWare\Maps\MapsServiceProvider" --tag=maps
```

Publish config to `config/vendor/maps.php`
```bash
php artisan vendor:publish --provider="GoNoWare\Maps\MapsServiceProvider" --tag=config
```

Add styles to `</head>`
```php
@mapstyles
```

Add scripts before `</body>`
```php
@mapscripts
```

Show map
```php
@map([
    'lat' => '51',
    'lng' => '0',
    'zoom' => '5',
])
```

Show map with one marker
```php
@map([
    'lat' => '51',
    'lng' => '0',
    'zoom' => '5',
    'markers' => [[
        'lat' => '51',
        'lng' => '0',
    ]],
])
```

Show map with two markers
```php
@map([
    'lat' => '48.134664',
    'lng' => '11.555220',
    'zoom' => '13',
    'markers' => [[
        'lat' => '48.134664',
        'lng' => '11.555220',
    ], [
        'lat' => 11,
        'lng' => 11,
    ]],
])
```

Adjust map height
```css
.map-container {
    height: 500px;
}
```
