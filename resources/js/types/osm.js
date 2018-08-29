import {fadeElementIn, isDefined, openLink} from '../utils/helper';

// TODO maybe add this https://github.com/elmarquis/Leaflet.GestureHandling/

// TODO add config for different styles like database connections: https://wiki.openstreetmap.org/wiki/Tile_servers
// http://leaflet-extras.github.io/leaflet-providers/preview/

// TODO custom icons: https://leafletjs.com/examples/custom-icons/

export default {
  type: 'osm',
  createMap(element, mapData) {
    if (!isDefined(window.L)) {
      return;
    }
    const {lat, lng, zoom} = mapData;

    const map = window.L
      .map(element, {})
      .on('load', () => {
        fadeElementIn(element);
      })
      .setView([lat, lng], zoom);

    window.L
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
      .addTo(map);

    return map;
  },
  createMarker(map, markerData) {
    const {lat, lng, url} = markerData;

    const marker = window.L
      .marker([lat, lng])
      .addTo(map);

    if (url) {
      marker.addEventListener('click', () => {
        openLink(url);
      });
    }
  },
}
