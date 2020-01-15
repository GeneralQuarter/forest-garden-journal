import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import circle from '@turf/circle';
import lineIntersect from '@turf/line-intersect';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { gardenLimits } from '../garden-limits';
import { MapDrawingService } from '../services/map-drawing.service';
import { map, tap } from 'rxjs/operators';
import { PlantLocation } from '../models/plant-location';
import { latLngToGeoPoint } from '../models/geo-point.converter';
import { AngularFirestore } from '@angular/fire/firestore';
import { MapSelection } from '../models/map-selection';
import { Measure } from '../models/measure';
import { PlantLocationService } from '../services/plant-location.service';

@Component({
  selector: 'app-plant-location-add',
  templateUrl: './plant-location-add.component.html',
  styleUrls: ['./plant-location-add.component.scss']
})
export class PlantLocationAddComponent {
  form = new FormGroup({});
  model: {[id: string]: any} = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'measures',
      fieldGroup: [
        ...this.mapObjectFormGroup('Première Mesure', 'measure1'),
        ...this.mapObjectFormGroup('Deuxième Mesure', 'measure2'),
      ]
    },
    {
      key: 'intersection',
      type: 'select',
      templateOptions: {
        label: 'Intersection',
        required: true,
        options: [],
        valueProp: 'id',
        labelProp: 'name',
      },
      hooks: {
        onInit: field => {
          field.templateOptions.options = this.form.get('measures').valueChanges.pipe(
            map(value => {
              this.mapDrawingService.removeObject('I1');
              this.mapDrawingService.removeObject('I2');

              const {measure1, measure2} = value;

              if (!(measure1.from && measure1.distance && measure2.from && measure2.distance && measure1.from.id !== measure2.from.id)) {
                return [];
              }

              const poly1 = circle(
                [measure1.from.position.longitude, measure1.from.position.latitude],
                parseFloat(measure1.distance) / 1000,
                {steps: 360}
              );
              const poly2 = circle(
                [measure2.from.position.longitude, measure2.from.position.latitude],
                parseFloat(measure2.distance) / 1000,
                {steps: 360}
              );

              const points = lineIntersect(poly1, poly2);

              const bounds = gardenLimits.toGeoJSON();

              return points.features
                .filter(p => booleanPointInPolygon(p, bounds))
                .map((p, i) => {
                  const id = `I${i + 1}`;
                  this.mapDrawingService.addIntersectionMarker(id, [p.geometry.coordinates[1], p.geometry.coordinates[0]]);
                  return {id, name: id};
                });
            }),
            tap(options => field.formControl.setValue(options.length ? 'I1' : null))
          );
        },
        onDestroy: () => {
          this.mapDrawingService.removeObject('I1');
          this.mapDrawingService.removeObject('I2');
        }
      }
    }
  ];

  submitError = '';
  submitLoading = false;

  constructor(
    private mapDrawingService: MapDrawingService,
    private db: AngularFirestore,
    private plantLocationService: PlantLocationService,
  ) {
  }

  mapObjectFormGroup(title: string, key: string): FormlyFieldConfig[] {
    return [
      {
        className: 'form-group-title',
        template: `<span>${title}</span>`,
      },
      {
        fieldGroupClassName: 'form-row',
        key,
        hooks: {
          onInit: field => {
            this.drawCircle(field);
          },
          onDestroy: field => {
            this.mapDrawingService.removeCircle(field.key);
          }
        },
        fieldGroup: [
          {
            key: 'from',
            type: 'select-from-map-input',
            className: 'form-col',
            templateOptions: {
              label: 'A partir de',
              required: true
            }
          },
          {
            key: 'distance',
            type: 'input',
            className: 'form-col',
            templateOptions: {
              label: 'Distance (m)',
              required: true,
              type: 'number',
              min: 0,
              max: 500,
              step: 0.5
            }
          },
        ]
      }
    ];
  }

  drawCircle(field: FormlyFieldConfig) {
    field.formControl.valueChanges.subscribe(value => {
      this.mapDrawingService.removeCircle(field.key);

      if (!(value.from && value.distance)) {
        return;
      }

      const radius = parseFloat(value.distance);

      if (isNaN(radius)) {
        return;
      }

      this.mapDrawingService.addCircle(
        field.key,
        [value.from.position.latitude, value.from.position.longitude],
        radius
      );
    });
  }

  modelMeasureToMeasure(modelMeasure: {from: MapSelection, distance: number}): Measure {
    return {
      from: this.db.doc(`${modelMeasure.from.type}/${modelMeasure.from.id}`).ref,
      distance: modelMeasure.distance
    };
  }

  async submit(model) {
    this.submitError = '';

    if (this.form.invalid) {
      return;
    }

    const intersection = this.mapDrawingService.getObject(model.intersection);

    const plantLocation: PlantLocation = {
      position: latLngToGeoPoint(intersection.getLatLng()),
      measure1: this.modelMeasureToMeasure(model.measures.measure1),
      measure2: this.modelMeasureToMeasure(model.measures.measure2)
    };

    this.submitLoading = true;

    try {
      await this.plantLocationService.addPlantLocation(plantLocation);
    } catch (e) {
      this.submitError = e;
    }

    this.submitLoading = false;
  }
}
