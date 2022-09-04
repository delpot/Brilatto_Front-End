import { Component, Input, OnInit } from '@angular/core';
import { Jewel } from 'src/app/jewel/jewel.interface';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-added-jewel',
  templateUrl: './added-jewel.component.html',
  styleUrls: ['./added-jewel.component.css']
})
export class AddedJewelComponent implements OnInit {

  @Input() jewel: Jewel = {} as Jewel;
  maxQuantityReached: boolean = false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  add(jewel: Jewel) {  
    if (jewel.quantity < jewel.quantityInStock) {
      jewel.quantity += 1;
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        const addedJewels = JSON.parse(localCart);
        addedJewels.push(jewel);
        localStorage.setItem('cart', JSON.stringify(addedJewels))
        const cartCounter = addedJewels.length;
        this.cartService.cartSubject.next(cartCounter);
      } else {
        let storeCartData = [];
        storeCartData.push(jewel);
        localStorage.setItem('cart', JSON.stringify(storeCartData));
        const cartCounter = storeCartData.length;
        this.cartService.cartSubject.next(cartCounter);
      }
    } else {
      this.maxQuantityReached = true;
    }
  }

  subtract(jewel: Jewel) {
    this.maxQuantityReached = false;

    if (jewel.quantity > 0) {

      jewel.quantity =  jewel.quantity - 1;

      const localCart = localStorage.getItem('cart');

      if (localCart) {
        const addedJewels = JSON.parse(localCart);
        const jewelToRemove = addedJewels.find((j: Jewel) => j.color === jewel.color);
        const index = addedJewels.indexOf(jewelToRemove);
        if (index > -1) {
          addedJewels.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(addedJewels))
        const cartCounter = addedJewels.length;
        this.cartService.cartSubject.next(cartCounter);
      }
    }
  }
}
