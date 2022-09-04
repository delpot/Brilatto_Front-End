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

  updateQuantity(jewel: Jewel, add: boolean) { 
    const localCart = localStorage.getItem('cart');

    if (!localCart) {
      return;
    }

    const addedJewels = JSON.parse(localCart);
    const jewelToUpdate = addedJewels.find((j: Jewel) => j.color === jewel.color);
    const index = addedJewels.indexOf(jewelToUpdate);
    if (index === -1) {
      return;
    }
    
    if (add) {
      jewel.quantity += 1;
      if (jewel.quantity < jewel.quantityInStock) {
          addedJewels[index].quantity = jewel.quantity;
      } else {
        jewel.quantity--;
        this.maxQuantityReached = true;
      }
    } else {
      jewel.quantity--;
      if (jewel.quantity >= 0) {
          addedJewels[index].quantity = jewel.quantity;
      } else {
        jewel.quantity = 0
      }
    }

      localStorage.setItem('cart', JSON.stringify(addedJewels))
      const cartCounter = addedJewels.length;
      this.cartService.cartSubject.next(cartCounter);
      const total = this.computeTotal(addedJewels);
      this.cartService.cartTotalSubject.next(total);
  }

  computeTotal(jewels: Jewel[]) {
    let cartTotal = 0;  

      for (const jewel of jewels) {
        console.log(jewel.price * jewel.quantity);
        cartTotal += (jewel.price * jewel.quantity)
      }
      return cartTotal;
  }
}
