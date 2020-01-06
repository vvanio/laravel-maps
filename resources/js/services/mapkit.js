import {fadeElementIn, isDefined, logError} from '../utils/helper';

export default {
  NAME: 'mapkit',
  createMap(element, mapData) {
    if (!isDefined(window.mapkit)) {
      logError('mapkit is undefined');
      return;
    }
    const {lat, lng, zoom, service} = mapData;

    window.mapkit.init({
      authorizationCallback(done) {
        /*
             const xhr = new XMLHttpRequest();
             xhr.open('GET', '/services/jwt');
             xhr.addEventListener('load', function() {
               done(this.responseText);
             });
             xhr.send();
             */
        done(service.key);
      },
    });
    window.mapkit.addEventListener('configuration-change', event => {
      if (event.status === 'Initialized') {
        fadeElementIn(element);
      }
    });

    const map = new window.mapkit.Map(element, {
      mapType: service.type || window.mapkit.Map.MapTypes.Standard,
    });

    const delta = Math.exp(Math.log(360) - (zoom * Math.LN2)); // TODO: zoom to delta not working
    map.region = new window.mapkit.CoordinateRegion(
      new window.mapkit.Coordinate(lat, lng),
      new window.mapkit.CoordinateSpan(delta, delta),
    );

    return map;
  },
  createMarker(map, markerData) {
    const {title, lat, lng, url, icon} = markerData;

    const coordinate = new window.mapkit.Coordinate(lat, lng);

    const markerAnnotationOptions = {title};

    if (url) {
      markerAnnotationOptions.callout = {
        calloutRightAccessoryForAnnotation: function() {
          const accessoryViewRight = document.createElement('a');
          accessoryViewRight.className = 'right-accessory-view';
          accessoryViewRight.href = url;
          accessoryViewRight.target = '_blank';
          accessoryViewRight.appendChild(document.createTextNode('ⓘ'));
          return accessoryViewRight;
        }
      };
    }

    if (icon) {
        markerAnnotationOptions.glyphImage = {
            1: icon,
        };
    }

    const marker = new window.mapkit.MarkerAnnotation(coordinate, markerAnnotationOptions);

    map.showItems([marker]); // TODO: map auto resize bugging if multiple markers

    return marker;
  },
};
