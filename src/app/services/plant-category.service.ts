import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { PlantCategory } from '../models/plant-category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantCategoryService {
  private collection: AngularFirestoreCollection<PlantCategory>;
  private readonly collection$: Observable<PlantCategory[]>;

  constructor(
    private db: AngularFirestore
  ) {
    this.collection = this.db.collection<PlantCategory>('plant-categories');
    this.collection$ = this.collection.valueChanges({idField: 'id'});
  }

  get plantCategories(): Observable<PlantCategory[]> {
    return this.collection$;
  }

  getPlantRef(id: string): DocumentReference {
    return this.getPlantDoc(id).ref;
  }

  private getPlantDoc(id: string): AngularFirestoreDocument<PlantCategory> {
    return this.collection.doc<PlantCategory>(id);
  }
}
