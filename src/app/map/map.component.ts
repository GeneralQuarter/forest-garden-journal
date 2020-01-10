import { AfterViewInit, Component, OnInit } from '@angular/core';
import { latLng, Layer, marker, polygon, tileLayer } from 'leaflet';
import { MarkerService } from '../services/marker.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { markerIcon } from './marker-icon';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxNativeZoom: 19,
        maxZoom: 22,
        minZoom: 17,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 19,
    center: latLng(46.4801794, 0.8926283)
  };

  gardenLimitLayer = polygon([
    [46.4805400, 0.8919087],
    [46.4805700, 0.8938935],
    [46.4801987, 0.8939683],
    [46.4801505, 0.8935218],
    [46.4800024, 0.8935571],
    [46.4799840, 0.8933780],
    [46.4798300, 0.8934160],
    [46.4797012, 0.8919543]
  ]);

  markerLayers$: Observable<Layer[]>;

  constructor(
    private markerService: MarkerService
  ) { }

  ngOnInit(): void {
    this.markerLayers$ = this.markerService.markers.pipe(
      map(markers => markers.map(m => marker(latLng(m.position.latitude, m.position.longitude), {
        title: `Balise ${m.name}`,
        icon: markerIcon(m.name, m.orientation)
      }))),
    );
  }

  ngAfterViewInit(): void {
    window.dispatchEvent(new Event('resize'));
  }

}
