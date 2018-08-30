@if ($enabled)
    @if ($service == 'osm' || $service == 'bing' || $service == 'mapquest')
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css" integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA==" crossorigin="" type="text/css">
    @endif
    @if ($service == 'mapquest')
        <link rel="stylesheet" href="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest-core.css" type="text/css">
    @endif
    <link rel="stylesheet" href="{{ asset(mix('css/index.css', 'vendor/maps')) }}" type="text/css">
@endif
