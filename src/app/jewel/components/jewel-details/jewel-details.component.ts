import { Component, Input, OnInit } from '@angular/core';
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

  constructor() { }

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

    if (localCart === null) {
      let storeCartData = [];
      storeCartData.push(jewel);
      localStorage.setItem('cart', JSON.stringify(storeCartData));
    } else {
      this.addedJewels = JSON.parse(localCart);
      this.addedJewels.push(jewel);
      localStorage.setItem('cart', JSON.stringify(this.addedJewels))
    }

    window.location.reload()
  }

}
