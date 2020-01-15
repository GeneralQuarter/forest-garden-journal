import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Plant } from '../models/plant';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private collection: AngularFirestoreCollection<Plant>;
  private readonly collection$: Observable<Plant[]>;

  constructor(
    private db: AngularFirestore,
  ) {
    this.collection = this.db.collection<Plant>('plants');
    this.collection$ = this.collection.valueChanges({idField: 'id'});
  }

  get plants(): Observable<Plant[]> {
    return this.collection$;
  }

  getPlant(id: string): Observable<Plant> {
    return this.collection$.pipe(map(plants => plants.find(p => p.id === id)));
  }

  async addPlant(plant: Plant): Promise<DocumentReference> {
    return this.collection.add(plant);
  }
}
