import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JewelForm } from './jewel.interface';

@Injectable({
  providedIn: 'root',
})
export class JewelService {
  ROOT_URL = 'http://localhost:8000';
  JEWELS_URL = '/api/jewels/';
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

  getAllJewelsByModelId(modelId: string): Observable<any> {
    return this.http.get<any>(
      environment.baseUrl + this.JEWELS_URL + 'model/' + modelId,
      this.httpOptions
    );
}

addOneJewel(jewelDto: JewelForm) {
  console.log(jewelDto);
  return this.http.post<any>(
    environment.baseUrl + this.JEWELS_URL + 'add',
    jewelDto,
    this.httpOptions
  )
}

deleteOneJewel(jewelId: string): Observable<any> {
  return this.http.put<any>(
    environment.baseUrl + this.JEWELS_URL + jewelId + '/softDelete',
    this.httpOptions
  )
}
}