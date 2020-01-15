import { Component, Input } from '@angular/core';
import { Plant } from '../models/plant';

@Component({
  selector: 'app-plant-latin-name',
  templateUrl: './plant-latin-name.component.html',
})
export class PlantLatinNameComponent {
  @Input() plant: Plant;

  constructor() { }
}
