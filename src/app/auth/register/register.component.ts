import { Component } from '@angular/core';
import { RegisterForm } from '../models/register-form.interface';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { HttpResponse } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerDto: RegisterForm;
  registerForm: FormGroup;
  selectedYear!: string;
  selectedMonth!: string;
  years: string[] = this.getYearsOfBirth();
  months: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  days: string[] = this.getDaysInAMonth();
  countries: string[] = ['France', 'Monaco', 'Italie'];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registerDto = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      dateOfBirth: new Date(),
      address: {
        addressLine1: '',
        city: '',
        postalCode: '',
        country: '',
        addressLine2: ''
      }
    }
    this.registerForm = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname:  [null, Validators.required],
      email: [null, [Validators.required, Validators.email, Validators.minLength(6)]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)]],
      confirmPassword: [null, Validators.required],
      dayOfBirth: [null, Validators.required],
      monthOfBirth: [null, Validators.required],
      yearOfBirth: [null, Validators.required],
      addressLine1: [null, Validators.required],
      city: [null, Validators.required],
      postalCode: [null, Validators.required],
      country: [null, Validators.required],
      addressLine2: [null],
      },  
      {
        validators: this.passwordsMatch
      });
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  onSelectMonth(month: Event) {
    this.selectedMonth = this.getValue(month);
    this.days = this.getDaysInAMonth();
  }

  onSelectYear(year: Event) {
    this.selectedYear = this.getValue(year);
    this.days = this.getDaysInAMonth();
  }

  getYearsOfBirth(): string[] {
    const years: string[] = [];
    const currentYear = + new Date().toString().slice(-54 ,-50);
    const maxYear = currentYear - 18;
    const minYear = maxYear - 90;

    for (let i = minYear; i <= maxYear; i++) {
      years.push(i.toString());
    }

    return years;
  }

 isBissextile(year: string): boolean {
  if ((+year % 4 === 0 && +year % 100 !== 0) || +year % 400 === 0) {
    return true;
  } else {
    return false;
  }
}

  getDaysInAMonth(): string[] {
    const days: string[] = [];
    const months: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    if(!this.selectedYear)
      this.selectedYear = "2004";

    switch (this.selectedMonth) {
      case months[1]:
          const max = this.isBissextile(this.selectedYear) ? 29 : 28;
          for (let i = 1; i <= max; i++) {
            days.push(i.toString());
          };
        break;
      case (months[3] || months[5] || months[8] || months[10]):
          for (let i = 1; i <= 30; i++) {
            days.push(i.toString());
          };
        break;
      default:
        for (let i = 1; i <= 31; i++) {
          days.push(i.toString());
        };
    }

    return days;
  }

  passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const matchingPassword = control.get('confirmPassword');

    if (password !== null && matchingPassword !== null) {
      if (password.value === matchingPassword.value) {
        matchingPassword.setErrors(null);
        return null;
      } else {
        matchingPassword.setErrors({passwordsNotMatching: true});
        return {passwordsNotMatching: true};
      }
    } else {
      return null;
    }
  }

  shouldDisplayRequiredError(control: AbstractControl | null): boolean {
    if (control) {
      return control.hasError('required') && control.touched;
    }
    return false;
  }

  shouldDisplayEmailError(control: AbstractControl | null): boolean {
    if (control) {
      return control.hasError('email') && control.touched;
    }
    return false;
  }

  shouldDisplayPatternError(control: AbstractControl | null): boolean {
    if (control) {
      return control.hasError('pattern') && control.touched;
    }
    return false;
  }

  shouldDisplayPasswordsNotMatchingError(control: AbstractControl | null): boolean {
    if (control) {
      return control.hasError('passwordsNotMatching') && control.touched;
    }
    return false;
  }

  // isInvalid(): boolean {
  //   for (const control of Object.values(this.registerForm.controls)) {
  //     if (control.errors) {
  //       console.log(control.errors)
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  isLoading: boolean = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  onSubmit(): void {
    if (this.isLoading) return;
    this.isLoading = true;

    this.registerDto.firstname = this.registerForm.controls['firstname'].value;
    this.registerDto.lastname = this.registerForm.controls['lastname'].value;
    this.registerDto.email = this.registerForm.controls['email'].value;
    this.registerDto.password = this.registerForm.controls['password'].value;
    const monthNumber = this.months.indexOf(this.registerForm.controls['monthOfBirth'].value) + 1;
    this.registerDto.dateOfBirth = new Date(`${this.registerForm.controls['yearOfBirth'].value}-${monthNumber}-${this.registerForm.controls['dayOfBirth'].value}`);
    this.registerDto.address.addressLine1 = this.registerForm.controls['addressLine1'].value;
    this.registerDto.address.addressLine2 = this.registerForm.controls['addressLine2'].value;
    this.registerDto.address.city = this.registerForm.controls['city'].value;
    this.registerDto.address.postalCode = this.registerForm.controls['postalCode'].value;
    this.registerDto.address.country = this.registerForm.controls['country'].value;

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, this.registerDto.email, this.registerDto.password)
      .then((userCredential) => {
        console.log(`User registered in Firebase: ${userCredential.user.email}`);
      })
      .catch((error) => {
        console.log(`Error code: ${error.code}. Error message: ${error.message}.`)
      })
      .finally(() => this.isLoading = false);

    this.authService
    .register(this.registerDto)
    .subscribe({
      next: (res) => {
        console.log(res);
        alert('Vous êtes inscrit(e)!');
        this.router.navigate(['/login'])
      },
      error: (err) => {
        console.log(`${err.statusText}: ${err.error}`);
      }
    });
  }
}
