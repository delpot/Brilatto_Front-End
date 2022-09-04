import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { Jewel } from '../../jewel.interface';

@Component({
  selector: 'app-jewel-details',
  templateUrl: './jewel-details.component.html',
  styleUrls: ['./jewel-details.component.css']
})
export class JewelDetailsComponent implements OnInit {
  @Input() jewel: Jewel = {} as Jewel;
  addedJewels: Jewel[]= [];
  maxQuantityReached: boolean = false;
  cartCounter: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  add(jewel: Jewel) {
    if (jewel.quantity < jewel.quantityInStock) {
      jewel.quantity += 1;
    } else {
      this.maxQuantityReached = true;
    }
  }

  subtract(jewel: Jewel) {
    this.maxQuantityReached = false;
    if (jewel.quantity > 0) {
      jewel.quantity =  jewel.quantity - 1;
    }
  }

  addToCart(jewel: Jewel): void {
    const localCart = localStorage.getItem('cart');

    if (localCart) {
      this.addedJewels = JSON.parse(localCart);
      this.addedJewels.push(jewel);
      localStorage.setItem('cart', JSON.stringify(this.addedJewels))
    } else {
      let storeCartData = [];
      storeCartData.push(jewel);
      localStorage.setItem('cart', JSON.stringify(storeCartData));
    }

    this.cartCounter = this.addedJewels.length;
    this.cartService.cartSubject.next(this.cartCounter);
  }

}
