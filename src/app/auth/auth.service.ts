import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterForm } from './models/register-form.interface';
import { LoginForm } from './models/login-form.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  ROOT_URL = 'http://localhost:8000';
  LOGIN_URL = '/api/auth/login';
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
  tokenPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService 
  ) {
      this.tokenPayload = this.getTokenDecoded();
  }

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

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

  getToken() {
    return (localStorage.getItem('token'));
 }

  getTokenDecoded() {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token);
    } else {
      return null;
    }
  }
}
