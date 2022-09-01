import { Component, OnInit, Output } from '@angular/core';
import { JewelCategory } from 'src/app/jewel-category/types/JewelCategory';
import { JewelCategoryService } from 'src/app/jewel-category/services/jewel-category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-jewel-categories',
  templateUrl: './all-jewel-categories.component.html',
  styleUrls: ['./all-jewel-categories.component.css'],
})
export class AllJewelCategoriesComponent implements OnInit {
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

  // onSelect(category: JewelCategory) {
  //   this.router.navigate(['', category.name])
  // }
}
