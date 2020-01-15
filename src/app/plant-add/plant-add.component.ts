import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { PlantCategoryService } from '../services/plant-category.service';
import { map } from 'rxjs/operators';
import { Plant } from '../models/plant';
import { PlantService } from '../services/plant.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-plant-add',
  templateUrl: './plant-add.component.html',
  styleUrls: ['./plant-add.component.scss']
})
export class PlantAddComponent {
  form = new FormGroup({});
  model: {[id: string]: any} = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'genus',
      type: 'input',
      templateOptions: {
        required: true,
        label: 'Gene'
      }
    },
    {
      key: 'species',
      type: 'input',
      templateOptions: {
        required: true,
        label: 'Espece'
      }
    },
    {
      key: 'cultivar',
      type: 'input',
      templateOptions: {
        label: 'Variété'
      }
    },
    {
      key: 'common',
      type: 'input',
      templateOptions: {
        required: true,
        label: 'Nom Commun'
      }
    },
    {
      key: 'dimension',
      fieldGroupClassName: 'form-row',
      fieldGroup: [
        {
          key: 'height',
          type: 'input',
          className: 'form-col',
          templateOptions: {
            required: true,
            label: 'Hauteur (m)',
            type: 'number',
            min: 0,
            step: 0.5,
            max: 100
          },
        },
        {
          key: 'diameter',
          type: 'input',
          className: 'form-col',
          templateOptions: {
            required: true,
            label: 'Diametre (m)',
            type: 'number',
            min: 0,
            step: 0.5,
            max: 100
          }
        }
      ]
    },
    {
      key: 'categoryId',
      type: 'select',
      templateOptions: {
        required: true,
        label: 'Catégorie',
        options: [],
        valueProp: 'id',
        labelProp: 'name',
      },
      hooks: {
        onInit: field => {
          field.templateOptions.options = this.plantCategoryService.plantCategories
            .pipe(
              map(pcs => pcs.map(
                ({id, name}) => ({id, name})
              ))
            );
        }
      }
    }
  ];

  submitLoading = false;
  submitError = '';

  constructor(
    private plantCategoryService: PlantCategoryService,
    private plantService: PlantService,
    private location: Location,
  ) { }

  async submit(model) {
    this.submitError = '';

    if (this.form.invalid) {
      return;
    }

    this.submitLoading = true;

    const {genus, species, cultivar, common, dimension, categoryId} = model;
    const {height, diameter} = dimension;

    const category = this.plantCategoryService.getPlantRef(categoryId);

    const plant: Plant = {
      genus,
      species,
      common,
      height,
      diameter,
      category
    };

    if (cultivar) {
      plant.cultivar = cultivar;
    }

    try {
      await this.plantService.addPlant(plant);
      this.location.back();
    } catch (e) {
      this.submitError = e;
    }

    this.submitLoading = false;
  }
}
