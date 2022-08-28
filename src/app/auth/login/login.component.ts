import { Component } from '@angular/core';
import { LoginForm } from '../models/login-form.interface';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthService } from '../auth.service';
import { HttpResponse } from '@angular/common/http';

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
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (this.isLoading) return;
    this.isLoading = true;

    this.authService
    .login(this.form)
    .subscribe((res: HttpResponse<any>) => {
        console.log(res);
      });

    const auth = getAuth();
    
    signInWithEmailAndPassword(auth, this.form.email, this.form.password)
      .then((userCredential) => {
        console.log(`User logged in Firebase: ${userCredential.user.email}`);
        alert('Vous êtes connecté(e)!');
      })
      .catch((error) => {
        console.log(`Error code: ${error.code}. Error message: ${error.message}.`)
      })
      .finally(() => this.isLoading = false);
  }
}
