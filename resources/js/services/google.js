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
    const {title, lat, lng, url} = markerData;

    const marker = new window.google.maps.Marker({
      position: new window.google.maps.LatLng(lat, lng),
      map,
      title,
      draggable: false,
      // icon: {
      //   url: markerConfig.mapMarkerImg,
      // },
    });

    if (url) {
      marker.addListener('click', () => {
        openUrl(url);
      });
    }
  },
};
