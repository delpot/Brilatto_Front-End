import { Component, Input, OnInit } from '@angular/core';
import { Jewel } from 'src/app/jewel/jewel.interface';

@Component({
  selector: 'app-added-jewel',
  templateUrl: './added-jewel.component.html',
  styleUrls: ['./added-jewel.component.css']
})
export class AddedJewelComponent implements OnInit {

  @Input() jewel: Jewel = {} as Jewel;
  maxQuantityReached: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  add(jewel: Jewel) {
    if (jewel.quantity < jewel.quantityInStock) {
      jewel.quantity += 1;
    } else {
      this.maxQuantityReached = true;
    }
  }

  subtract(jewel: Jewel) {
    this.maxQuantityReached = false;
    if (jewel.quantity > 0) {
      jewel.quantity =  jewel.quantity - 1;
    }
  }

}
