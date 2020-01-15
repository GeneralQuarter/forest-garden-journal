import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../models/plant';
import { PlantService } from '../services/plant.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.scss']
})
export class PlantsComponent implements OnInit {
  plants$: Observable<Plant[]>;
  isAdmin$: Observable<boolean>;

  constructor(
    private plantService: PlantService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.plants$ = this.plantService.plants;
    this.isAdmin$ = this.userService.isAdmin;
  }

  trackByPlantId(index: number, plant: Plant) {
    return plant.id;
  }
}
