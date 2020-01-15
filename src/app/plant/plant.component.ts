import { Component, OnInit } from '@angular/core';
import { Plant } from '../models/plant';
import { Observable } from 'rxjs';
import { PlantService } from '../services/plant.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { WikipediaImageService } from '../services/wikipedia-image.service';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.scss']
})
export class PlantComponent implements OnInit {
  plant$: Observable<Plant>;
  image$: Observable<string>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private plantService: PlantService,
    private wikipediaImageService: WikipediaImageService,
  ) { }

  ngOnInit() {
    this.plant$ = this.activatedRoute.paramMap.pipe(
      switchMap(paramMap => this.plantService.getPlant(paramMap.get('id'))),
      tap(plant => {
        this.image$ = this.wikipediaImageService.imageUrlForPlant(plant);
      })
    );
  }

}
