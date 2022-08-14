import { Component } from '@angular/core';
import { RegisterForm } from '../types/register-form.interface';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { AuthService } from '../auth.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: RegisterForm = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordToConfirm: '',
  };

  passwordsMatched: boolean = true;
  isLoading: boolean = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (this.isLoading) return;
    if (this.form.password !== this.form.passwordToConfirm) {
      this.passwordsMatched = false;
      return;
    }
    this.isLoading = true;

    const { firstname, lastname, email, password, passwordToConfirm } =
      this.form;

    this.authService
      .register(firstname, lastname, email, password, passwordToConfirm)
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
      });

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
