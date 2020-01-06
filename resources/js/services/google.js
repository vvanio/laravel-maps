import {fadeElementIn, isDefined, logError, openUrl} from '../utils/helper';

export default {
  NAME: 'google',
  createMap(element, mapData) {
    if (!isDefined(window.google)) {
      logError('google is undefined');
      return;
    }
    if (!isDefined(window.google.maps)) {
      logError('google maps is undefined');
      return;
    }

    const {lat, lng, zoom, service} = mapData;

    const map = new window.google.maps.Map(element, {
      center: new window.google.maps.LatLng(lat, lng),
      zoom,
      mapTypeId: service.type || window.google.maps.MapTypeId.ROADMAP,
    });

    window.google.maps.event.addListenerOnce(map, 'idle', () => {
      fadeElementIn(element);
    });

    return map;
  },
  createMarker(map, markerData) {
    const {title, lat, lng, url, icon, iconSize, iconAnchor} = markerData;

    const markerOptions = {
      position: new window.google.maps.LatLng(lat, lng),
      map,
      title,
      draggable: false,
    };

    if (icon) {
      markerOptions.icon = {
        url: icon,
      };
      if (iconSize) {
        markerOptions.icon.size = new window.google.maps.Size(...iconSize);
      }
      if (iconAnchor) {
        markerOptions.icon.anchor = new window.google.maps.Point(...iconAnchor);
      }
    }

    const marker = new window.google.maps.Marker(markerOptions);

    if (url) {
      marker.addListener('click', () => {
        openUrl(url);
      });
    }

    return marker;
  },
};
