import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateAccountForm } from './update-account-form.interface';
import { UserService } from './user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  updateAccountDto: UpdateAccountForm;
  userForm: FormGroup;
  countries: string[] = ['France', 'Monaco', 'Italie'];

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
    ) {
    this.updateAccountDto = {
      userId: '',
      firstname: '',
      lastname: '',
      email:'',
      addressLine1: '',
      city: '',
      postalCode: 0,
      country: '',
      addressLine2: '',
      dateOfBirth: new Date()
    };
    this.userForm = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname:  [null, Validators.required],
      email: [null, [Validators.required, Validators.email, Validators.minLength(6)]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)]],
      dateOfBirth: [null, Validators.required],
      addressLine1: [null, Validators.required],
      city: [null, Validators.required],
      postalCode: [null, Validators.required],
      country: [null, Validators.required],
      addressLine2: [null],
      });
  }

  ngOnInit(): void {
    const localUserId = localStorage.getItem('userId');
    if (!localUserId) return;
    this.updateAccountDto.userId = localUserId;
    this.userService.getUserAccount(this.updateAccountDto.userId).subscribe({
      next: (res) => {
        this.updateAccountDto.firstname = res.firstname;
        this.updateAccountDto.lastname = res.lastname;
        this.updateAccountDto.email = res.email;
        this.updateAccountDto.addressLine1 = res.address.addressLine1;
        this.updateAccountDto.city = res.address.city;
        this.updateAccountDto.postalCode = res.address.postalCode;
        this.updateAccountDto.country = res.address.country;
        this.updateAccountDto.addressLine2 = res.address.addressLine2;
        this.updateAccountDto.dateOfBirth = res.dateOfBirth.slice(0, 10);
      },
      error: (err) => {
        console.log(`${err.statusText}: ${err.error.message}`);
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.controls['firstname'].value) {
      this.updateAccountDto.firstname = this.userForm.controls['firstname'].value;
    } 
    if (this.userForm.controls['lastname'].value) {
      this.updateAccountDto.lastname = this.userForm.controls['lastname'].value;
    } 
    if (this.userForm.controls['email'].value) {
      this.updateAccountDto.email = this.userForm.controls['email'].value;
    } 
    if (this.userForm.controls['dateOfBirth'].value) {
      this.updateAccountDto.dateOfBirth = this.userForm.controls['dateOfBirth'].value;
    } 
    if (this.userForm.controls['addressLine1'].value) {
      this.updateAccountDto.addressLine1 = this.userForm.controls['addressLine1'].value;
    } 
    if (this.userForm.controls['addressLine2'].value) {
      this.updateAccountDto.addressLine2 = this.userForm.controls['addressLine2'].value;
    } 
    if (this.userForm.controls['city'].value) {
      this.updateAccountDto.city = this.userForm.controls['city'].value;
    } 
    if (this.userForm.controls['postalCode'].value) {
      this.updateAccountDto.postalCode = this.userForm.controls['postalCode'].value;
    } 
    if (this.userForm.controls['country'].value) {
      this.updateAccountDto.country = this.userForm.controls['country'].value;
    } 

    this.userService
    .updateUserAccount(this.updateAccountDto.userId, this.updateAccountDto)
    .subscribe({
      next: (res) => {
        this.router
          .navigate(['/account'])
          .then(() => window.location.reload())
      },
      error: (err) => {
        console.log(`${err.statusText}: ${err.error.message}`);
      }
    });
  }

}
