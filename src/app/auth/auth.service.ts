import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address, RegisterForm } from './models/register-form.interface';
import { LoginForm } from './models/login-form.interface';

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

  login(loginForm: LoginForm): Observable<any> {
      return this.http.post<any>(
        environment.baseUrl + this.LOGIN_URL,
        loginForm,
        this.httpOptions
      );
  }

  register(registerForm: RegisterForm): Observable<any> {
    return this.http.post<any>(
      environment.baseUrl + this.SIGNUP_URL,
      registerForm,
      this.httpOptions
    );
  }
}
