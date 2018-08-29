import google from './types/google';
import osm from './types/osm';
import bing from './types/bing';
import mapkit from './types/mapkit';

import parser from './utils/parser';
import {isDefined} from './utils/helper';

const createMap = (element, createMap, createMarker) => {
  if (!isDefined(element)) {
    return;
  }
  const mapData = parser.map(element);
  const map = createMap(element, mapData);

  mapData.markers.forEach(markerData => {
    if (!isDefined(map)) {
      return;
    }
    createMarker(map, markerData);
  })
};

const createMapType = map => {
  const createMapType = element => createMap(
    element,
    map.createMap,
    map.createMarker,
  );
  const selector = `[data-map-type="${map.type}"]`;
  const elements = document.querySelectorAll(selector) || [];
  elements.forEach(createMapType);
};

window.onGoogleMapsReady = () => createMapType(google);

(() => createMapType(osm))();

(() => createMapType(bing))();

(() => createMapType(mapkit))();
