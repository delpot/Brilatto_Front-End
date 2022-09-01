import { Component, Input } from '@angular/core';
import { JewelCategory } from 'src/app/jewel-category/jewel-category.interface';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
})
export class CategoryDetailsComponent {
  @Input() category: JewelCategory = {} as JewelCategory;

  constructor() {}

  getCategory() {
    console.log(this.category);
    return this.category;
  }
}
