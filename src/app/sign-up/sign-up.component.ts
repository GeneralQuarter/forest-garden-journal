import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Pseudo de Jardinier',
        placeholder: 'Entrer un pseudo',
        required: true
      }
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email',
        type: 'email',
        placeholder: 'Entrer email',
        required: true,
      },
      validators: {
        validation: ['email']
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        label: 'Mot de Passe',
        type: 'password',
        placeholder: 'Entrer mot de passe',
        required: true
      }
    },
    {
      key: 'password2',
      type: 'input',
      templateOptions: {
        label: 'Mot de Passe (confirmation)',
        type: 'password',
        placeholder: 'Entrer mot de passe',
        required: true
      }
    }
  ];

  constructor() { }

  submit(model) {
    console.log(model);
  }
}
