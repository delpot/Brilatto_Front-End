import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { CategoryForm, JewelCategory } from 'src/app/jewel-category/jewel-category.interface';
import { JewelCategoryService } from 'src/app/jewel-category/jewel-category.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
})
export class CategoriesListComponent implements OnInit {
  categories: JewelCategory[] = [];
  categoryDto: CategoryForm;
  categoryForm: FormGroup;
  isAdmin: boolean = false;
  missingFields: boolean = false;

  constructor(
    private categoryService: JewelCategoryService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.categoryDto = {
      name: '',
      photo: '',
      description: ''
    }
    this.categoryForm = this.formBuilder.group({
      name: [null, Validators.required],
      photo:  [null, Validators.required],
      description: [null],
      });
    this.isAdmin = (this.authService.tokenPayload) ? this.authService.tokenPayload.isAdmin : false;
  }

  ngOnInit(): void {
    this.categoryService.getAllJewelCategories().subscribe({
      next: (res) => {
        this.categories = res;
        for (const category of this.categories) {
          const imagePath = `./assets/photos/categories/${category.photo}`;
          category.photo = imagePath;
        }
      },
      error: (err) => {
        console.log(`${err.statusText}: ${err.error}`);
      }
    });
  }

  onSubmit(): void {
    this.categoryDto.name = this.categoryForm.controls['name'].value;
    this.categoryDto.photo = this.categoryForm.controls['photo'].value;
    this.categoryDto.description = this.categoryForm.controls['description'].value;

    this.missingFields = false;
    
    this.categoryService
    .addOneCategory(this.categoryDto)
    .subscribe({
      next: (res) => {
        console.log(res);
        alert(`Nouvelle catégorie ${res.name} ajoutée!`);
        window.location.reload()
      },
      error: (err) => {
        if (err.error.message === '⚠ Missing fields!') {
          this.missingFields = true;
        }
        console.log(`${err.statusText}: ${err.error.message}`);
      }
    });
  }
}
