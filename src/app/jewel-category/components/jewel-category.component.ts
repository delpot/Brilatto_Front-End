import { Component, Input } from '@angular/core';
import { JewelCategory } from 'src/app/jewel-category/types/JewelCategory';

@Component({
  selector: 'app-jewel-category',
  templateUrl: './jewel-category.component.html',
  styleUrls: ['./jewel-category.component.css'],
})
export class JewelCategoryComponent {
  @Input() category: JewelCategory = {} as JewelCategory;

  constructor() {}

  getCategory() {
    console.log(this.category);
    return this.category;
  }
}
