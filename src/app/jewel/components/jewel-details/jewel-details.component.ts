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

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
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
