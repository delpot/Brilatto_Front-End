import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private cartService: CartService,
    private router: Router
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
    this.authService.clearUserId();
    this.isLoggedIn = false;
    this.cartCounter = 0;
    Converter.clearCart();
    this.router
      .navigate(['/login'])
      .then(() => window.location.reload())
}
}
