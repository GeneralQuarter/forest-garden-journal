import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Marker } from '../models/marker';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  constructor(
    private db: AngularFirestore
  ) {}

  get markers(): Observable<Marker[]> {
    return this.db.collection<Marker>('markers').valueChanges({idField: 'id'});
  }
}
