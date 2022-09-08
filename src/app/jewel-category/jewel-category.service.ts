import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryForm } from './jewel-category.interface';

@Injectable({
  providedIn: 'root',
})
export class JewelCategoryService {
  ROOT_URL = 'http://localhost:8000';
  CATEGORIES_URL = '/api/categories/';
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

  getAllJewelCategories(): Observable<any> {
    return this.http.get<any>(
      environment.baseUrl + this.CATEGORIES_URL,
      this.httpOptions
    );
  }

  addOneCategory(categoryDto: CategoryForm) {
    return this.http.post<any>(
      environment.baseUrl + this.CATEGORIES_URL + 'add',
      categoryDto,
      this.httpOptions
    );
  }

  deleteOneCategory(categoryId: string): Observable<any> {
    return this.http.put<any>(
      environment.baseUrl + this.CATEGORIES_URL + categoryId + '/softDelete',
      this.httpOptions
    );
  }
}
