import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { PlantLocation } from '../models/plant-location';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantLocationService {
  private collection: AngularFirestoreCollection<PlantLocation>;
  private readonly collection$: Observable<PlantLocation[]>;

  constructor(
    private db: AngularFirestore
  ) {
    this.collection = this.db.collection<PlantLocation>('plant-locations');
    this.collection$ = this.collection.valueChanges({idField: 'id'});
  }

  get plantLocations(): Observable<PlantLocation[]> {
    return this.collection$;
  }

  getPlantLocation(id: string): Observable<PlantLocation | undefined> {
    return this.collection.doc<PlantLocation>(id).valueChanges();
  }

  async addPlantLocation(plantLocation: PlantLocation): Promise<DocumentReference> {
    return this.collection.add(plantLocation);
  }
}
