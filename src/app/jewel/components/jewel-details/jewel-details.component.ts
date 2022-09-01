import { Component, Input, OnInit } from '@angular/core';
import { Jewel } from '../../jewel.interface';

@Component({
  selector: 'app-jewel-details',
  templateUrl: './jewel-details.component.html',
  styleUrls: ['./jewel-details.component.css']
})
export class JewelDetailsComponent implements OnInit {
  @Input() jewel: Jewel = {} as Jewel;

  constructor() { }

  ngOnInit(): void {
  }

}
