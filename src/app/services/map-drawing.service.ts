import { Injectable } from '@angular/core';
import { Circle, Layer, LatLngExpression, marker, Marker } from 'leaflet';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { newMarkerIcon } from '../map/marker-icon';

@Injectable({
  providedIn: 'root'
})
export class MapDrawingService {
  private objects = new BehaviorSubject<{[id: string]: Marker | Circle}>({});

  constructor() {}

  get layers(): Observable<Layer[]> {
    return this.objects.pipe(map(os => Object.values(os)));
  }

  addIntersectionMarker(id: string, center: LatLngExpression) {
    const nextValue = {
      ...this.objects.value,
      [id]: marker(center, {
        title: id,
        icon: newMarkerIcon(id)
      })
    };

    this.objects.next(nextValue);
  }

  removeObject(id: string) {
    if (!this.objects.value[id]) {
      return;
    }

    const nextValue = {...this.objects.value};
    delete nextValue[id];

    this.objects.next(nextValue);
  }

  getObject(id: string): Circle | Marker {
    return this.objects.value[id];
  }

  addCircle(id: string, center: LatLngExpression, radius: number) {
    const nextValue = {
      ...this.objects.value,
      [id]: new Circle(center, radius, {
        dashArray: '4',
        fill: null,
        weight: 1,
        color: '#414141'
      })
    };

    this.objects.next(nextValue);
  }

  removeCircle(id: string) {
    this.removeObject(id);
  }
}
