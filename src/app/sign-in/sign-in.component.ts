import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
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
    }
  ];

  constructor() {
  }

  submit(model) {
    console.log(model);
  }
}
