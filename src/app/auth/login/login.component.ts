import { Component } from '@angular/core';
import { LoginForm } from '../types/login-form.interface';
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

    const { email, password } = this.form;

    this.authService.login(email, password).subscribe(
      (res: HttpResponse<any>) => {
        console.log(res);
      }
    //   {
    //   next: (data) => {
    //     console.log(data);
    //     this.isLoginFailed = false;
    //     this.isLoggedIn = true;
    //   },
    //   error: (err) => {
    //     this.errorMessage = err.error.message;
    //     this.isLoginFailed = true;
    //   },
    // }
    );

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
  }
}
