import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Jewel } from '../jewel/jewel.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {

    cartSubject = new Subject<any>()

  constructor() {}
  
}