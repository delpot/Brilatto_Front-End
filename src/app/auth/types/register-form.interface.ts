export interface RegisterForm {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordToConfirm: string;
  dateOfBirth: DateOfBirth;
  address: Address
}

export interface DateOfBirth {
  dayOfBirth: string;
  monthOfBirth: string;
  yearOfBirth: string;
}

export interface Address {
  addressLine1: string;
  city: string;
  postalCode: string;
  country: string;
  addressLine2?: string;
}
