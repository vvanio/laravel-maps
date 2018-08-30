import {logError} from "./helper";

const parseMap = element => JSON.parse(
  element.dataset.mapGoogle
  || element.dataset.mapOsm
  || element.dataset.mapBing
  || element.dataset.mapMapquest
  || element.dataset.mapYandex
  || element.dataset.mapMapkit
);

const parseService = element => {
  const {key, type} = JSON.parse(element.dataset.mapService);

  return {
    key,
    type,
  }
};

const parseMarkers = element => {
  const markers = JSON.parse(element.dataset.mapMarkers) || [];
  return markers.map(marker => {
    const lat = parseFloat(marker.lat);
    const lng = parseFloat(marker.lng);
    const {title, url} = marker;

    return {
      title,
      lat,
      lng,
      url,
    };
  });
};

export default {
  map(element) {
    try {
      const map = parseMap(element);
      const lat = parseFloat(map.lat);
      const lng = parseFloat(map.lng);
      const zoom = parseInt(map.zoom);
      const service = parseService(element);
      const markers = parseMarkers(element);
      return {
        lat,
        lng,
        zoom,
        service,
        markers,
      };
    } catch (e) {
      logError(e);
    }
  },
}
