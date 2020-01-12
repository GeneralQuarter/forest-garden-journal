import { Component, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { SelectFromMapComponent } from './select-from-map/select-from-map.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-select-from-map',
  template: `
    <!--suppress AngularInvalidExpressionResultType -->
    <app-select-from-map [formControl]="formControl"
                         [formlyAttributes]="field"
                         [errorStateMatcher]="errorStateMatcher"></app-select-from-map>
    <ng-template #matSuffix>
      <button mat-icon-button (click)="formFieldControl.clear()" *ngIf="!formFieldControl.empty">
        <mat-icon>close</mat-icon>
      </button>
    </ng-template>
  `,
})
// tslint:disable-next-line:component-class-suffix
export class FormlySelectFromMap extends FieldType {
  @ViewChild(SelectFromMapComponent) formFieldControl: SelectFromMapComponent;
}
