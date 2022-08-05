import { Component, OnInit } from '@angular/core';
import { LoginForm } from '../types/login-form.interface';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

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
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.form.email, this.form.password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('Ces identifiants sont incorrects.');
      });
    return this.form;
  }
}
