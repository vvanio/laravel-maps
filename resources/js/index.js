import google from './services/google';
import osm from './services/osm';
import bing from './services/bing';
import mapquest from './services/mapquest';
import yandex from './services/yandex';
import mapkit from './services/mapkit';

import parser from './utils/parser';
import {isDefined, logError} from './utils/helper';

const createMap = (element, createMap, createMarker) => {
  if (!isDefined(element)) {
    logError('element is undefined');
    return;
  }
  const mapData = parser.map(element);
  if (!isDefined(mapData)) {
    logError('map data is undefined');
    return;
  }
  const map = createMap(element, mapData);
  if (!isDefined(map)) {
    logError('map is undefined');
    return;
  }

  mapData.markers.forEach(markerData => {
    createMarker(map, markerData);
  })
};

const createMapService = service => {
  const createMapService = element => createMap(
    element,
    service.createMap,
    service.createMarker,
  );
  const selector = `[data-map-${service.NAME}]`;
  const elements = document.querySelectorAll(selector) || [];
  elements.forEach(createMapService);
};

window.onGoogleMapsReady = () => createMapService(google);

window.onYandexMapsReady = () => createMapService(yandex);

window.addEventListener('DOMContentLoaded', () => {
  (() => createMapService(osm))();

  (() => createMapService(bing))();

  (() => createMapService(mapquest))();

  (() => createMapService(mapkit))();
});


