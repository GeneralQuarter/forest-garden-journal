import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import circle from '@turf/circle';
import lineIntersect from '@turf/line-intersect';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { gardenLimits } from '../garden-limits';
import { MapDrawingService } from '../services/map-drawing.service';
import { map, tap } from 'rxjs/operators';

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
      key: 'mapObjects',
      fieldGroup: [
        ...this.mapObjectFormGroup('Première Mesure', 'firstMapObject'),
        ...this.mapObjectFormGroup('Deuxième Mesure', 'secondMapObject'),
      ]
    },
    {
      key: 'location',
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
          field.templateOptions.options = this.form.get('mapObjects').valueChanges.pipe(
            map(value => {
              this.mapDrawingService.removeObject('I1');
              this.mapDrawingService.removeObject('I2');

              const {firstMapObject, secondMapObject} = value;

              if (!(firstMapObject.object && firstMapObject.radius && secondMapObject.object && secondMapObject.radius)) {
                return [];
              }

              const poly1 = circle(
                [firstMapObject.object.position.longitude, firstMapObject.object.position.latitude],
                parseFloat(firstMapObject.radius) / 1000
              );
              const poly2 = circle(
                [secondMapObject.object.position.longitude, secondMapObject.object.position.latitude],
                parseFloat(secondMapObject.radius) / 1000
              );

              const points = lineIntersect(poly1, poly2);

              const bounds = gardenLimits.toGeoJSON();

              return points.features
                .filter(p => booleanPointInPolygon(p, bounds))
                .map((p, i) => {
                  const id = `I${i + 1}`;
                  this.mapDrawingService.addNewMarker(id, [p.geometry.coordinates[1], p.geometry.coordinates[0]]);
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

  constructor(
    private mapDrawingService: MapDrawingService
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
            key: 'object',
            type: 'select-from-map-input',
            className: 'form-col',
            templateOptions: {
              label: 'A partir de',
              required: true
            }
          },
          {
            key: 'radius',
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

      if (!(value.object && value.radius)) {
        return;
      }

      const radius = parseFloat(value.radius);

      if (isNaN(radius)) {
        return;
      }

      this.mapDrawingService.addCircle(
        field.key,
        [value.object.position.latitude, value.object.position.longitude],
        radius
      );
    });
  }

  submit(model) {
    console.log(model);
  }
}
