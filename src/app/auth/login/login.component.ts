import { Component } from '@angular/core';
import { LoginForm } from '../models/login-form.interface';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthService } from '../auth.service';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginDto: LoginForm;
  loginForm: FormGroup;
  isLoading: boolean = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    ) {
      this.loginDto = {
        email: '',
        password: ''
      }
      this.loginForm = this.formBuilder.group({
        email: [null, Validators.required],
        password: [null, Validators.required]
      })
    }

  onSubmit(): void {
    if (this.isLoading) return;
    this.isLoading = true;

    this.loginDto = this.loginForm.value

    this.authService
    .login(this.loginDto)
    .subscribe((res: HttpResponse<any>) => {
        console.log(res);
      });

    const auth = getAuth();
    
    signInWithEmailAndPassword(auth, this.loginDto.email, this.loginDto.password)
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
