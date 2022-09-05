import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { JewelCategoryService } from './jewel-category.service';

@NgModule({
  declarations: [CategoryDetailsComponent, CategoriesListComponent],
  providers: [JewelCategoryService],
  imports: [CommonModule, AppRoutingModule, ReactiveFormsModule],
  exports: [CategoriesListComponent],
})
export class JewelCategoryModule {}
