import { AfterViewInit, Component, OnInit } from '@angular/core';
import { latLng, Layer, marker, tileLayer } from 'leaflet';
import { MarkerService } from '../services/marker.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { markerIcon } from './marker-icon';
import { MapSelectionService } from '../services/map-selection.service';
import { MapObjectType } from '../models/map-object-type';
import { gardenLimits } from '../garden-limits';
import { MapDrawingService } from '../services/map-drawing.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxNativeZoom: 19,
        maxZoom: 22,
        minZoom: 17,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 19,
    center: latLng(46.4801794, 0.8926283)
  };

  gardenLimitLayer = gardenLimits;

  markerLayers$: Observable<Layer[]>;
  drawingLayer$: Observable<Layer[]>;

  constructor(
    private markerService: MarkerService,
    private mapSelectionService: MapSelectionService,
    private mapDrawingService: MapDrawingService,
  ) { }

  ngOnInit(): void {
    this.markerLayers$ = this.markerService.markers.pipe(
      map(markers => markers.map(m => {
        const layer = marker(latLng(m.position.latitude, m.position.longitude), {
          title: `Balise ${m.name}`,
          icon: markerIcon(m.name, m.orientation)
        });

        layer.on('click', () => {
          this.mapSelectionService.updateActiveSelection({
            type: MapObjectType.Marker,
            id: m.id,
            name: `Balise ${m.name}`,
            position: m.position
          });
        });

        return layer;
      })),
    );
    this.drawingLayer$ = this.mapDrawingService.layers;
  }

  ngAfterViewInit(): void {
    window.dispatchEvent(new Event('resize'));
  }

}
