import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { CartComponent } from './cart/components/cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ModelsListComponent } from './jewel-model/components/models-list/models-list.component';
import { JewelsListComponent } from './jewel/components/jewels-list/jewels-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'not-found', component: NotFoundComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent },
  { path: 'cart', component: CartComponent },
  { path: ':categoryId', component: ModelsListComponent },
  { path: 'model/:modelId', component: JewelsListComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
