import * as firebase from 'firebase';
import GeoPoint = firebase.firestore.GeoPoint;
import { MarkerOrientation } from '../map/marker-icon';

export interface Marker {
  id?: string;
  name: string;
  position: GeoPoint;
  orientation: MarkerOrientation;
}
