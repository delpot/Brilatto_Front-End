import { Component, Input, OnInit, Output } from '@angular/core';
import { Jewel } from 'src/app/jewel/jewel.interface';
import { CartService } from '../../cart.service';
import {KeyValue} from '@angular/common';
import { Converter } from 'src/app/utils/converter.utils';

@Component({
  selector: 'app-added-jewel',
  templateUrl: './added-jewel.component.html',
  styleUrls: ['./added-jewel.component.css']
})
export class AddedJewelComponent implements OnInit {

  @Input() jewel: Jewel = {} as Jewel;
  @Input() addedJewels = new Map<Jewel, number>();
  maxQuantityReached: boolean = false;
  quantity = 0;
 
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.quantity = this.addedJewels.get(this.jewel)!; 
  }

  updateQuantity(add: boolean) { 
    if(!this.quantity) return;
    if (add) {

      this.quantity++;
      if (this.quantity <= this.jewel.quantityInStock) {
        this.addedJewels.set(this.jewel, this.quantity);
      } else {
        this.quantity--;
        this.maxQuantityReached = true;
      }
    } else {
      this.quantity--;
      if (this.quantity > 0) {
        this.addedJewels.set(this.jewel, this.quantity);
        this.maxQuantityReached = false;
      }else{
        this.quantity++;
      }
    }

    Converter.SetJewelMapToLocal(this.addedJewels);
    this.cartService.cartSubject.next(Converter.GetCartCounter(this.addedJewels));
    this.cartService.cartTotalSubject.next(Converter.GetTotalCart(this.addedJewels));
  }

  removeJewelFromCart(jewel: Jewel) {
    this.addedJewels.delete(jewel);
    Converter.SetJewelMapToLocal(this.addedJewels)
    this.cartService.cartSubject.next(Converter.GetCartCounter(this.addedJewels));
    this.cartService.cartTotalSubject.next(Converter.GetTotalCart(this.addedJewels));
    window.location.reload();
  }
}
