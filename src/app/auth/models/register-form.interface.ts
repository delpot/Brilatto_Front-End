export interface RegisterForm {
  firstname: string;
  lastname: string;
  email: string;
  password: string,
  dateOfBirth: string;
  address: Address
}

export interface Address {
  addressLine1: string;
  city: string;
  postalCode: string;
  country: string;
  addressLine2?: string;
}
