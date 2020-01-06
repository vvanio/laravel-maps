import google from './services/google';
import osm from './services/osm';
import bing from './services/bing';
import mapquest from './services/mapquest';
import yandex from './services/yandex';
import mapkit from './services/mapkit';

import parser from './utils/parser';
import {isDefined, logError} from './utils/helper';
import './utils/customEventPolyfill';

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

  const markers = mapData.markers.map(markerData => createMarker(map, markerData));

  return {
    map,
    markers,
  };
};

const createMapService = service => {
  const createMapService = element => createMap(
    element,
    service.createMap,
    service.createMarker,
  );
  const selector = `[data-map-${service.NAME}]`;
  const elements = Array.prototype.slice.call(document.querySelectorAll(selector) || []);
  elements.forEach(element => {
    const data = createMapService(element);
    dispatchEvent(service.NAME, element, data);
  });
};

const dispatchEvent = (serviceName, element, data) => {
  const event = new CustomEvent('LaravelMapInitialized', {
    detail: {
      element: element,
      map: data.map,
      markers: data.markers || [],
      service: serviceName,
    },
  });
  window.dispatchEvent(event);
};

window.onGoogleMapsReady = () => createMapService(google);

window.onYandexMapsReady = () => createMapService(yandex);

window.addEventListener('DOMContentLoaded', () => {
  (() => createMapService(osm))();

  (() => createMapService(bing))();

  (() => createMapService(mapquest))();

  (() => createMapService(mapkit))();
});


