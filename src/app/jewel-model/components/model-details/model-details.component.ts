import { Component, Input, OnInit } from '@angular/core';
import { JewelModel } from '../../jewel-model.interface';

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css']
})
export class ModelDetailsComponent implements OnInit {
  @Input() model: JewelModel = {} as JewelModel;

  constructor() { }

  ngOnInit(): void {
  }

}
