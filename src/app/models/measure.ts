import { DocumentReference } from '@angular/fire/firestore';

export interface Measure {
  from: DocumentReference;
  distance: number;
}
