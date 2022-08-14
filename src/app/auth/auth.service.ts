import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  ROOT_URL = 'http://localhost:8000';
  LOGIN_URL = '/api/auth/login/';
  SIGNUP_URL = '/api/auth/signup';
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    }),
  };

  constructor(private http: HttpClient) {}

  login(email: string, pwd: string) {
    console.log(
      email,
      pwd
    );
    return this.http.post<any>(
      environment.baseUrl + this.LOGIN_URL,
      { email, pwd },
      this.httpOptions
    );
  }

  register(
    firstname: string,
    lastname: string,
    email: string,
    passwordToConfirm: string,
    confirmedPassword: string
  ) {
    console.log(
      firstname,
      lastname,
      email,
      passwordToConfirm,
      confirmedPassword
    );
    return this.http.post<any>(
      environment.baseUrl + this.SIGNUP_URL,
      { firstname, lastname, email, passwordToConfirm, confirmedPassword },
      this.httpOptions
    );
  }
}
