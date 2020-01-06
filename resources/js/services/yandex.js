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
    const {title, lat, lng, url, icon, iconSize, iconAnchor} = markerData;

    const placemarkProperties = {
      hintContent: title,
    };

    const placemarkOptions = {};

    if (icon) {
      placemarkOptions.iconLayout = 'default#imageWithContent';
      placemarkOptions.iconImageHref = icon;
      if (iconSize) {
        placemarkOptions.iconImageSize = iconSize;
      }
      if (iconAnchor) {
        placemarkOptions.iconImageOffset = iconAnchor;
      }
    }

    const marker = new window.ymaps.Placemark([lat, lng], placemarkProperties, placemarkOptions);

    // if (url) {
    //   marker.addListener('click', () => {
    //     openUrl(url);
    //   });
    // }

    map.geoObjects.add(marker);

    return marker;
  },
};
