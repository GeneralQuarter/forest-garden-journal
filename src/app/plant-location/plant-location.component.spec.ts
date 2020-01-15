import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantLocationComponent } from './plant-location.component';

describe('PlantLocationComponent', () => {
  let component: PlantLocationComponent;
  let fixture: ComponentFixture<PlantLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
