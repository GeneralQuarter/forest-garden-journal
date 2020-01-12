import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFromMapComponent } from './select-from-map.component';

describe('SelectFromMapComponent', () => {
  let component: SelectFromMapComponent;
  let fixture: ComponentFixture<SelectFromMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectFromMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFromMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
