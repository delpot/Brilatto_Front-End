import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = this.authService.isLoggedIn()
  cartCounter: number = 0;

  constructor(private authService: AuthService) {}

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
