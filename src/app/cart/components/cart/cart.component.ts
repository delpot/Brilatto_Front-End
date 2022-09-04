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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartDetails()
  }

  cartDetails() {
    const localCart = localStorage.getItem('cart');
    if (localCart) {
      this.addedJewels = JSON.parse(localCart)
    }
  }

}
