import { Measure } from './measure';
import { DocumentReference } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

export interface PlantLocation {
  id?: string;
  plant?: DocumentReference;
  position: firestore.GeoPoint;
  measure1: Measure;
  measure2: Measure;
}
