import { Injectable } from '@angular/core';
import { MapSelection } from '../models/map-selection';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapSelectionService {
  private selections = new BehaviorSubject<{[id: string]: MapSelection | null}>({});
  private activeSelectionId: string;

  get isSelecting() {
    return !!this.activeSelectionId;
  }

  registerSelection(selectionId: string): Observable<MapSelection | null> {
    const value = this.selections.value;
    this.selections.next({
      [selectionId]: null,
      ...value
    });
    return this.selections.pipe(
      map(selections => selections[selectionId]),
      distinctUntilChanged()
    );
  }

  setActive(selectionId: string) {
    this.activeSelectionId = selectionId;
  }

  clearActive() {
    this.activeSelectionId = null;
  }

  removeSelection(selectionId: string) {
    if (selectionId === this.activeSelectionId) {
      this.clearActive();
    }

    const nextValue = {...this.selections.value};
    delete nextValue[selectionId];
    this.selections.next(nextValue);
  }

  updateActiveSelection(selection: MapSelection) {
    if (!this.activeSelectionId) {
      return;
    }

    this.updateSelection(this.activeSelectionId, selection);
  }

  updateSelection(selectionId: string, selection: MapSelection) {
    const nextValue = {
      ...this.selections.value,
      [selectionId]: selection
    };

    this.selections.next(nextValue);
  }
}
