import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantLocationAddComponent } from './plant-location-add.component';

describe('PlantLocationAddComponent', () => {
  let component: PlantLocationAddComponent;
  let fixture: ComponentFixture<PlantLocationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantLocationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantLocationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
