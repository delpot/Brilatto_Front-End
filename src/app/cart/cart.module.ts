import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { AddedJewelComponent } from './components/added-jewel/added-jewel.component';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [CartComponent, AddedJewelComponent],
  providers: [],
  imports: [CommonModule, AppRoutingModule],
  exports: [],
})
export class CartModule {}