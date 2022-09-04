import { Component, Input, OnInit } from '@angular/core';
import { Jewel } from 'src/app/jewel/jewel.interface';

@Component({
  selector: 'app-added-jewel',
  templateUrl: './added-jewel.component.html',
  styleUrls: ['./added-jewel.component.css']
})
export class AddedJewelComponent implements OnInit {

  @Input() jewel: Jewel = {} as Jewel;

  constructor() { }

  ngOnInit(): void {
  }

}
