import { Component, OnInit } from '@angular/core';
import { LoginForm } from '../types/login-form.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: LoginForm = {
    email: '',
    password: '',
  };

  constructor() {}

  submit() {
    return this.form;
  }
}
