import { AfterViewInit, Component, OnInit } from '@angular/core';
import { latLng, polygon, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
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

  constructor() { }

  ngAfterViewInit(): void {
    window.dispatchEvent(new Event('resize'));
  }

}
