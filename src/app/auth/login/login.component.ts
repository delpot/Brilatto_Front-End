import { Component } from '@angular/core';
import { LoginForm } from '../models/login-form.interface';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginDto: LoginForm;
  loginForm: FormGroup;
  isLoading: boolean = false;
  missingEmail: boolean = false;
  missingPassword: boolean = false;
  userNotFound: boolean = false;
  wrongPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
    ) {
      this.loginDto = {
        email: '',
        password: ''
      }
      this.loginForm = this.formBuilder.group({
        email: '',
        password: ''
      })
    }

  onSubmit(): void {
    if (this.isLoading) return;
    this.isLoading = true;

    this.wrongPassword = false;
    this.userNotFound = false;

    this.loginDto = this.loginForm.value

    const auth = getAuth();
    
    signInWithEmailAndPassword(auth, this.loginDto.email, this.loginDto.password)
      .then((userCredential) => {
        console.log(`User logged in Firebase: ${userCredential.user.email}`);
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/missing-email':
            this.missingEmail = true;
            break;
          case 'auth/internal-error':
            this.missingPassword = true;
            break;
          case 'auth/user-not-found':
            this.userNotFound = true;
            break;
          case 'auth/wrong-password':
            this.wrongPassword = true;
            break;
        }
        console.log(`Error code: ${error.code}. Error message: ${error.message}.`)
      })
      .finally(() => this.isLoading = false);

      
  this.authService
  .login(this.loginDto)
  .subscribe({
    next: (res) => {
      console.log(res);
      this.authService.saveToken(res.token);
      this.router
        .navigate(['/'])
        .then(() => window.location.reload());
    },
    error: (err) => {
      console.log(`${err.statusText}: ${err.error}`);
    }});
  }
}
