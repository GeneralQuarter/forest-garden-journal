import { MarkerOrientation } from '../map/marker-icon';
import { firestore } from 'firebase/app';

export interface Marker {
  id?: string;
  name: string;
  position: firestore.GeoPoint;
  orientation: MarkerOrientation;
}
