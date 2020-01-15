import { DocumentReference } from '@angular/fire/firestore';

export interface Plant {
  id?: string;
  genus: string;
  species: string;
  cultivar?: string;
  common: string;
  height: number;
  diameter: number;
  category: DocumentReference;
}
