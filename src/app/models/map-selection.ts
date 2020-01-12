import { MapObjectType } from './map-object-type';
import GeoPoint = firebase.firestore.GeoPoint;
import * as firebase from 'firebase';

export interface MapSelection {
  type: MapObjectType;
  id: string;
  name: string;
  position: GeoPoint;
}
