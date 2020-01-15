import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';

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

  submitError: auth.Error;
  submitLoading = false;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  async submit(model) {
    this.submitError = null;

    if (this.form.invalid) {
      return;
    }

    const {email, password} = model;

    this.submitLoading = true;

    try {
      await this.userService.signInUser(email, password);
      this.router.navigateByUrl('/');
    } catch (e) {
      this.submitError = e;
    }

    this.submitLoading = false;
  }
}
