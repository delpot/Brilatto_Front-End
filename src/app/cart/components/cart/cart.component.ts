import { Component, OnInit } from '@angular/core';
import { Jewel } from '../../../jewel/jewel.interface';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  addedJewels: Jewel[] = [];

  cartTotal: number = 0;

  constructor(private cartService: CartService) {
    this.cartService.cartTotalSubject.subscribe(
      data => {
        this.cartTotal = data;
      }
    )
  }

  ngOnInit(): void {
    this.cartDetails();
    this.computeTotal();
  }

  cartDetails() {
    const localCart = localStorage.getItem('cart');
    if (localCart) {
      this.addedJewels = JSON.parse(localCart)
    }
  }

  computeTotal() {
    const localCart = localStorage.getItem('cart');      
      for (const jewel of this.addedJewels) {
        this.cartTotal += (jewel.price * jewel.quantity)
      }
  }

}
