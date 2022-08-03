import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { AllJewelCategoriesComponent } from './components/all-jewel-categories.component';
import { JewelCategoryComponent } from './components/jewel-category.component';
import { JewelCategoryService } from './services/jewel-category.service';

@NgModule({
  declarations: [JewelCategoryComponent, AllJewelCategoriesComponent],
  providers: [JewelCategoryService],
  imports: [CommonModule, AppRoutingModule],
  exports: [AllJewelCategoriesComponent],
})
export class JewelCategoryModule {}
