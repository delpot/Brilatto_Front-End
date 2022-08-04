import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AllJewelCategoriesComponent } from './jewel-category/components/all-jewel-categories.component';
import { JewelCategoryComponent } from './jewel-category/components/jewel-category.component';

const routes: Routes = [
  { path: 'categories', component: AllJewelCategoriesComponent },
  { path: 'categories/:categoryName', component: JewelCategoryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
