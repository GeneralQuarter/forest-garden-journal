import { DocumentReference } from '@angular/fire/firestore';

export interface Profile {
  name: string;
  role?: DocumentReference;
}
