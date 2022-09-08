import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { JewelCategory } from 'src/app/jewel-category/jewel-category.interface';
import { JewelCategoryService } from '../../jewel-category.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
})
export class CategoryDetailsComponent {
  @Input() category: JewelCategory = {} as JewelCategory;
  @Input() categories: JewelCategory[] = [];
  @Input() isAdmin: boolean = false;

  constructor(
    private categoryService: JewelCategoryService,
    private router: Router
  ) {}

  deleteCategory(categoryId: string) {
    this.categoryService.deleteOneCategory(categoryId).subscribe({
      next: (res) => {
        const newCategoryList = this.categories.filter(
          (category) => category._id !== res._id
        );
        this.categories = newCategoryList;
        this.router.navigate(['/']).then(() => window.location.reload());
      },
      error: (err) => {
        console.log(`${err.statusText}: ${err.error}`);
      },
    });
  }
}
