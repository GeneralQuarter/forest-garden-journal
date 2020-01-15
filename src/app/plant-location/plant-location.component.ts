import { Component, OnInit } from '@angular/core';
import { PlantLocation } from '../models/plant-location';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PlantLocationService } from '../services/plant-location.service';

@Component({
  selector: 'app-plant-location',
  templateUrl: './plant-location.component.html',
  styleUrls: ['./plant-location.component.scss']
})
export class PlantLocationComponent implements OnInit {
  plantLocation$: Observable<PlantLocation>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private plantLocationService: PlantLocationService
  ) { }

  ngOnInit() {
    this.plantLocation$ = this.activatedRoute.paramMap.pipe(
      switchMap(paramMap => this.plantLocationService.getPlantLocation(paramMap.get('id')))
    );
  }

}
