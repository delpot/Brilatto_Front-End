import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddModelForm } from './models/add-model-form.interface';

@Injectable({
  providedIn: 'root',
})
export class JewelModelService {
  ROOT_URL = 'http://localhost:8000';
  MODELS_URL = '/api/models/';
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
    console.log(
      environment.baseUrl + this.MODELS_URL + 'category/' + categoryId
    );
    return this.http.get<any>(
      environment.baseUrl + this.MODELS_URL + 'category/' + categoryId,
      this.httpOptions
    );
  }

  getOneModel(modelId: string): Observable<any> {
    return this.http.get<any>(
      environment.baseUrl + this.MODELS_URL + modelId,
      this.httpOptions
    );
  }

  addOneModel(modelDto: AddModelForm) {
    console.log(modelDto);
    return this.http.post<any>(
      environment.baseUrl + this.MODELS_URL + 'add',
      modelDto,
      this.httpOptions
    );
  }

  deleteOneModel(modelId: string): Observable<any> {
    return this.http.put<any>(
      environment.baseUrl + this.MODELS_URL + modelId + '/softDelete',
      this.httpOptions
    );
  }
}
