import { Component, OnInit } from '@angular/core';
import { JewelCategory } from 'src/app/jewel-category/jewel-category.interface';
import { JewelCategoryService } from 'src/app/jewel-category/jewel-category.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
})
export class CategoriesListComponent implements OnInit {
  categories: JewelCategory[] = [];

  constructor(
    private jewelCategoryService: JewelCategoryService,
  ) {}

  ngOnInit(): void {
    this.jewelCategoryService.getAllJewelCategories().subscribe({
      next: (res) => {
        this.categories = res;
        for (const category of this.categories) {
          const imagePath = `./assets/img/${category.image}`;
          category.image = imagePath;
        }
      },
      error: (err) => {
        console.log(`${err.statusText}: ${err.error}`);
      }
    });
  }
}
