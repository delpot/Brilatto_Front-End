import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Converter } from 'src/app/utils/converter.utils';
import { Jewel } from '../../../jewel/models/jewel.interface';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  addedJewels = new Map<Jewel, number>();
  cartTotal: number = 0;
  listJewel: Jewel[] = [];

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {
    this.cartService.cartTotalSubject.subscribe((data) => {
      this.cartTotal = data;
    });
  }

  ngOnInit(): void {
    this.cartDetails();
    this.cartTotal = Converter.GetTotalCart(this.addedJewels);
  }

  cartDetails() {
    this.addedJewels = Converter.GetJewelMap();
    this.listJewel = Array.from(this.addedJewels.keys());
  }

  validCart() {
    if (this.authService.isLoggedIn()) {
      return null;
    } else {
      return this.router.navigate(['/login']);
    }
  }
}
