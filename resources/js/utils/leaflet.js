import {openUrl} from './helper';

export function createMarker(map, markerData) {
  const {title, lat, lng, url, icon, iconSize, iconAnchor} = markerData;

  const markerOptions = {
    title,
    keyboard: false,
    draggable: false,
  };

  if (icon) {
    const iconOptions = {
      iconUrl: icon,
    };
    if (iconSize) {
      iconOptions.iconSize = iconSize;
    }
    if (iconAnchor) {
      iconOptions.iconAnchor = iconAnchor;
    }
    markerOptions.icon = window.L.icon(iconOptions);
  }

  const marker = window.L.marker([lat, lng], markerOptions);

  if (url) {
    marker.on('click', event => {
      event.originalEvent.preventDefault();
      openUrl(url);
    });
  }

  marker.addTo(map);

  return marker;
}
