import { MapObjectType } from './map-object-type';
import { firestore } from 'firebase/app';

export interface MapSelection {
  type: MapObjectType;
  id: string;
  name: string;
  position: firestore.GeoPoint;
}
