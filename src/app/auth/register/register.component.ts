import { Component } from '@angular/core';
import { RegisterForm } from '../types/register-form.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: RegisterForm = {
    email: '',
    password: '',
    passwordToConfirm: '',
  };

  constructor() {}

  submit() {
    console.log(this.form);
    return this.form;
  }
}
