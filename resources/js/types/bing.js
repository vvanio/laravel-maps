import {fadeElementIn, isDefined, openLink} from '../utils/helper';
import 'leaflet-bing-layer';

// TODO: locales/culture

export default {
  type: 'bing',
  createMap(element, mapData) {
    if (!isDefined(window.L)) {
      return;
    }
    const {lat, lng, zoom, key} = mapData;

    const map = window.L
      .map(element, {})
      .on('load', () => {
        fadeElementIn(element);
      })
      .setView([lat, lng], zoom);

    console.log(key);

    window.L.tileLayer
      .bing({
        bingMapsKey: key,
        imagerySet: 'CanvasLight',
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
