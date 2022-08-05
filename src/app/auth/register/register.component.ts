import { Component } from '@angular/core';
import { RegisterForm } from '../types/register-form.interface';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

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

  passwordsMatched: boolean = true;

  isLoading: boolean = false;

  constructor() {}

  submit() {
    if (this.isLoading) return;
    if (this.form.password !== this.form.passwordToConfirm) {
      this.passwordsMatched = false;
      return;
    }
    this.isLoading = true;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.form.email, this.form.password)
      .then((userCredential) => {
        console.log(userCredential);
        alert('Vous êtes inscrit!');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })
      .finally(() => {
        this.isLoading = false;
        this.passwordsMatched = true;
      });
  }
}
