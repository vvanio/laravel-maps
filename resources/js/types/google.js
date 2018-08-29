import {fadeElementIn, isDefined, openLink} from '../utils/helper';

export default {
  type: 'google',
  createMap(element, mapData) {
    if (!isDefined(window.google)) {
      return;
    }
    if (!isDefined(window.google.maps)) {
      return;
    }

    const {lat, lng, zoom} = mapData;

    const map = new window.google.maps.Map(element, {
      center: new window.google.maps.LatLng(lat, lng),
      zoom: zoom,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    });

    window.google.maps.event.addListenerOnce(map, 'idle', () => {
      fadeElementIn(element);
    });

    return map;
  },
  createMarker(map, markerData) {
    const {lat, lng, url} = markerData;

    const marker = new window.google.maps.Marker({
      position: new window.google.maps.LatLng(lat, lng),
      map: map,
      title: 'Test Title', // TODO
      draggable: false,
      // icon: {
      //   url: markerConfig.mapMarkerImg,
      // },
    });

    if (url) {
      marker.addListener('click', () => {
        openLink(url);
      });
    }
  },
};
