import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../cart/cart.service';
import { Converter } from '../utils/converter.utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent  {
  isLoggedIn: boolean = this.authService.isLoggedIn()
  cartCounter: number = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {
    this.cartService.cartSubject.subscribe(
      data => {
        this.cartCounter = data;
      }
    )
  }

  ngOnInit(): void {
    this.cartCounter = Converter.GetCartCounter(Converter.GetJewelMap());
  }

  logout(): void {
    this.authService.clearToken();
    this.isLoggedIn = false;
}
}
