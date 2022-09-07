import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './cart/components/cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ModelsListComponent } from './jewel-model/components/models-list/models-list.component';
import { JewelsListComponent } from './jewel/components/jewels-list/jewels-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent },
  { path: 'cart', component: CartComponent },
  { path: ':categoryId', component: ModelsListComponent },
  { path: 'model/:modelId', component: JewelsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
