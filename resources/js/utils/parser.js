const parseMarker = marker => {
  const lat = parseFloat(marker.lat);
  const lng = parseFloat(marker.lng);
  const url = marker.url;

  return {
    lat,
    lng,
    url,
  };
};

export default {
  map(element) {
    const lat = parseFloat(element.dataset.mapLat);
    const lng = parseFloat(element.dataset.mapLng);
    const zoom = parseInt(element.dataset.mapZoom);
    const key = element.dataset.mapKey;
    const markers = (JSON.parse(element.dataset.mapMarkers) || []).map(parseMarker);

    return {
      lat,
      lng,
      zoom,
      key,
      markers,
    };
  },
}
