import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JewelModelService {
  ROOT_URL = 'http://localhost:8000';
  MODELS_LIST_URL = '/api/models/category/';
  MODEL_DETAILS_URL = '/api/models/';
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

  getAllJewelModelsByCategoryId(categoryId: string): Observable<any> {
    return this.http.get<any>(
      environment.baseUrl + this.MODELS_LIST_URL + categoryId,
      this.httpOptions
    );
  }

  getOneModel(modelId: string): Observable<any> {
    return this.http.get<any>(
      environment.baseUrl + this.MODEL_DETAILS_URL + modelId,
      this.httpOptions
    )
  }
}