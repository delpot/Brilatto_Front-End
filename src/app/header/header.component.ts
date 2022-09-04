import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
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
    this.countAddedJewels();
  }

  logout(): void {
    this.authService.clearToken();
    this.isLoggedIn = false;
}

  countAddedJewels(): number {
    const localCart = localStorage.getItem('cart')
    if (localCart) {
      this.cartCounter = JSON.parse(localCart).length;
    }
    return this.cartCounter;
  }
}
