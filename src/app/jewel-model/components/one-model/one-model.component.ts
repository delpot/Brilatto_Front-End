import { Component, Input, OnInit } from '@angular/core';
import { JewelModel } from '../../interfaces/jewel-model.interface';

@Component({
  selector: 'app-one-model',
  templateUrl: './one-model.component.html',
  styleUrls: ['./one-model.component.css']
})
export class OneModelComponent implements OnInit {
  @Input() model: JewelModel = {} as JewelModel;

  constructor() { }

  ngOnInit(): void {
  }

}
