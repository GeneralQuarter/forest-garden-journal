import { Component, DoCheck, ElementRef, HostBinding, Input, OnDestroy, Optional, Self } from '@angular/core';
import { MapSelection } from '../models/map-selection';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { MapSelectionService } from '../services/map-selection.service';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';
import { CanUpdateErrorState, CanUpdateErrorStateCtor, ErrorStateMatcher, mixinErrorState } from '@angular/material/core';

class SelectFromMapBase {
  // tslint:disable-next-line:variable-name
  constructor(public _defaultErrorStateMatcher: ErrorStateMatcher,
              // tslint:disable-next-line:variable-name
              public _parentForm: NgForm,
              // tslint:disable-next-line:variable-name
              public _parentFormGroup: FormGroupDirective,
              /** @docs-private */
              public ngControl: NgControl) {}
}
const SelectFromMapMixinBase: CanUpdateErrorStateCtor & typeof SelectFromMapBase =
  mixinErrorState(SelectFromMapBase);

@Component({
  selector: 'app-select-from-map',
  templateUrl: './select-from-map.component.html',
  styleUrls: ['./select-from-map.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: SelectFromMapComponent}],
})
export class SelectFromMapComponent extends SelectFromMapMixinBase implements ControlValueAccessor, MatFormFieldControl<MapSelection>,
  OnDestroy, DoCheck, CanUpdateErrorState {
  static nextId = 0;

  private ph: string; // placeholder
  private rq = false; // required
  private ds = false; // disabled
  private dv = ''; // display value;
  private v = null; // value;

  errorState = false;
  focused = false;
  controlType = 'select-from-map-input';
  @HostBinding('id') id = `select-from-map-input-${SelectFromMapComponent.nextId++}`;
  stateChanges = new Subject<void>();
  selectionSub: Subscription;
  @Input() errorStateMatcher: ErrorStateMatcher;

  get displayValue(): string {
    return this.dv;
  }

  set displayValue(dv: string) {
    this.dv = dv;
    this.stateChanges.next();
  }

  get value(): MapSelection | null {
    return this.v;
  }

  set value(v: MapSelection | null) {
    this.v = v;
    this.stateChanges.next();
  }

  @Input()
  get placeholder(): string {
    return this.ph;
  }

  set placeholder(value: string) {
    this.ph = value;
    this.stateChanges.next();
  }

  @Input()
  get required(): boolean {
    return this.rq;
  }

  set required(value: boolean) {
    this.rq = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean {
    return this.ds;
  }

  set disabled(value: boolean) {
    this.ds = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  get empty() {
    return !this.value;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  onChange = (_: MapSelection | null) => {};
  onTouched = () => {};

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    @Optional() parentForm: NgForm,
    @Optional() parentFormGroup: FormGroupDirective,
    defaultErrorStateMatcher: ErrorStateMatcher,
    private focusMonitor: FocusMonitor,
    private elementRef: ElementRef<HTMLElement>,
    private mapSelectionService: MapSelectionService
  ) {
    super(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);

    this.focusMonitor.monitor(this.elementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();

      if (this.focused) {
        this.mapSelectionService.setActive(this.id);
      }
    });
    this.selectionSub = this.mapSelectionService.registerSelection(this.id).subscribe(v => {
      this.onChange(v);
      this.displayValue = v ? v.name : '';
      this.value = v;
      this.focusInput();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(v: MapSelection | null): void {
    this.mapSelectionService.updateSelection(this.id, v);
  }

  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this.focusInput();
    }
  }

  focusInput() {
    const input = this.elementRef.nativeElement.querySelector('input');
    if (input) {
      input.focus();
    }
  }

  setDescribedByIds(ids: string[]): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.elementRef);
    if (this.selectionSub) {
      this.selectionSub.unsubscribe();
    }
    this.mapSelectionService.removeSelection(this.id);
  }

  clear() {
    this.mapSelectionService.updateSelection(this.id, null);
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.updateErrorState();
    }
  }
}
