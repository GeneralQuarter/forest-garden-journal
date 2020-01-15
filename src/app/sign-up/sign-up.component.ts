import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { UserService } from '../services/user.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

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
        type: 'text',
        required: true,
        minLength: 2
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
      validators: {
        fieldMatch: {
          expression: (control) => {
            const value = control.value;

            return value.passwordConfirm === value.password
              // avoid displaying the message error when values are empty
              || (!value.passwordConfirm || !value.password);
          },
          message: 'Les mot de passes ne correspondent pas',
          errorPath: 'passwordConfirm',
        },
      },
      fieldGroup: [
        {
          key: 'password',
          type: 'input',
          templateOptions: {
            label: 'Mot de Passe',
            type: 'password',
            placeholder: 'Entrer mot de passe',
            required: true,
            minLength: 6
          }
        },
        {
          key: 'passwordConfirm',
          type: 'input',
          templateOptions: {
            label: 'Mot de Passe (confirmation)',
            type: 'password',
            placeholder: 'Confirmer mot de passe',
            required: true,
            minLength: 6
          }
        }
      ]
    }
  ];

  submitError: firebase.auth.Error;
  submitLoading = false;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  async submit(model) {
    this.submitError = null;

    if (this.form.invalid) {
      return;
    }

    const {name, email, password} = model;

    this.submitLoading = true;

    try {
      await this.userService.signUpUser(name, email, password.password);
      this.router.navigateByUrl('/');
    } catch (e) {
      this.submitError = e;
    }

    this.submitLoading = false;
  }
}
