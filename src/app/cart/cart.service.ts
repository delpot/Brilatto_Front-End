import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Jewel } from '../jewel/models/jewel.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartSubject = new Subject<any>();
  cartTotalSubject = new Subject<any>();
  CART_URL = '/api/cart/';
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

  createCart(userId: string, jewelMap: Map<Jewel, number>): Observable<any> {
    return this.http.post<any>(
      environment.baseUrl + this.CART_URL + userId + '/add',
      jewelMap,
      this.httpOptions
    );
  }
}
