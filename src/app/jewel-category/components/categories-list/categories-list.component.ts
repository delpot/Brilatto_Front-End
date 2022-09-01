import { Component, OnInit } from '@angular/core';
import { JewelCategory } from 'src/app/jewel-category/jewel-category.interface';
import { JewelCategoryService } from 'src/app/jewel-category/jewel-category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
})
export class CategoriesListComponent implements OnInit {
  categories: JewelCategory[] = [];

  constructor(
    private jewelCategoryService: JewelCategoryService,
    private router: Router,
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
