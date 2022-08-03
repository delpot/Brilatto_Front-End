import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllJewelCategoriesComponent } from './jewel-category/components/all-jewel-categories.component';
import { JewelCategoryComponent } from './jewel-category/components/jewel-category.component';

const routes: Routes = [
  { path: 'categories', component: AllJewelCategoriesComponent },
  { path: 'categories/:categoryName', component: JewelCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
