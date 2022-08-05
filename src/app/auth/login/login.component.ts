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

  isLoading: boolean = false;

  constructor() {}

  submit() {
    if (this.isLoading) return;
    this.isLoading = true;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.form.email, this.form.password)
      .then((userCredential) => {
        console.log(userCredential);
        alert('Vous êtes connecté!');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('Ces identifiants sont incorrects.');
      })
      .finally(() => (this.isLoading = false));
    return this.form;
  }
}
