import {isDefined, logError} from '../utils/helper';

export default {
  NAME: 'yandex',
  createMap(element, mapData) {
    if (!isDefined(window.ymaps)) {
      logError('ymaps is undefined');
      return;
    }
    const {lat, lng, zoom} = mapData;

    const map = new window.ymaps.Map(element, {
      center: [lat, lng],
      zoom,
    });

    // window.google.maps.event.addListenerOnce(map, 'idle', () => {
    //   fadeElementIn(element);
    // });

    return map;
  },
  createMarker(map, markerData) {
    const {title, lat, lng, url} = markerData;

    const marker = new window.ymaps.Placemark([lat, lng], {
      hintContent: title,
    });

    // if (url) {
    //   marker.addListener('click', () => {
    //     openUrl(url);
    //   });
    // }

    map.geoObjects.add(marker);
  },
};
