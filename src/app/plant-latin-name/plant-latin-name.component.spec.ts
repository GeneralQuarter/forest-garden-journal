import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantLatinNameComponent } from './plant-latin-name.component';

describe('PlantLatinNameComponent', () => {
  let component: PlantLatinNameComponent;
  let fixture: ComponentFixture<PlantLatinNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantLatinNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantLatinNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
