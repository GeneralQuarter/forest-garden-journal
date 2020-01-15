import { LatLng, latLng, LatLngExpression } from 'leaflet';
import { firestore } from 'firebase/app';

export function latLngToGeoPoint(ll: LatLngExpression): firestore.GeoPoint {
  const t = latLng(ll);
  return new firestore.GeoPoint(t.lat, t.lng);
}

export function geoPointToLatLng(geoPoint: firestore.GeoPoint): LatLng {
  return latLng(geoPoint.latitude, geoPoint.longitude);
}
