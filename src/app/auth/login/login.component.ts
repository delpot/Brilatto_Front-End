import { Component } from '@angular/core';
import { LoginForm } from '../models/login-form.interface';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthService } from '../auth.service';
import { HttpResponse } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  shouldDisplayRequiredError(control: AbstractControl | null): boolean {
    if (control) {
      return control.hasError('required') && control.touched;
    }
    return false;
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
        this.authService
        .login(this.loginDto)
        .subscribe((res: HttpResponse<any>) => {
          console.log(res)
          });
        alert('Vous êtes connecté(e)!');
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
  }
}
