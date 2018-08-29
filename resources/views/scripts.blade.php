@if ($enabled)
    {{--TODO: If overriding type via @map() then type is not working--}}
    @if ($type == 'osm' || $type == 'bing')
        <script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"
                integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA=="
                crossorigin="" async defer></script>
        {{-- TODO check if bing needs polyfill: https://github.com/digidem/leaflet-bing-layer--}}
    @endif
    @if ($type == 'mapkit')
        <script src="https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js"  async defer></script>
    @endif
    <script src="{{ asset(mix('js/index.js', 'vendor/maps')) }}" type="text/javascript"></script>
    @if($type == 'google')
        <script src="https://maps-api-ssl.google.com/maps/api/js?v=3&ie=UTF8&oe=UTF8&key={{ $key }}&language={{ app()->getLocale() }}&callback=onGoogleMapsReady" async defer></script>
    @endif
@endif
