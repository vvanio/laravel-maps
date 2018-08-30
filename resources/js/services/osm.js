import {fadeElementIn, isDefined, logError, openUrl} from '../utils/helper';

// TODO maybe add this https://github.com/elmarquis/Leaflet.GestureHandling/

// TODO add config for different styles like database connections: https://wiki.openstreetmap.org/wiki/Tile_servers
// http://leaflet-extras.github.io/leaflet-providers/preview/

// TODO custom icons: https://leafletjs.com/examples/custom-icons/

export default {
  NAME: 'osm',
  createMap(element, mapData) {
    if (!isDefined(window.L)) {
      logError('leaflet is undefined');
      return;
    }
    const {lat, lng, zoom, service} = mapData;

    const map = window.L
      .map(element, {})
      .on('load', () => {
        fadeElementIn(element);
      })
      .setView([lat, lng], zoom);

    window.L
      .tileLayer(service.type || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
      .addTo(map);

    return map;
  },
  createMarker(map, markerData) {
    const {title, lat, lng, url} = markerData;

    const marker = window.L.marker([lat, lng], {
      title,
      keyboard: false,
      draggable: false,
    });

    if (url) {
      marker.on('click', event => {
        event.originalEvent.preventDefault();
        openUrl(url);
      });
    }

    marker.addTo(map);
  },
}
