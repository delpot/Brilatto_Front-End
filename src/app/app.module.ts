import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HeaderComponent } from './header/header.component';
import { JewelCategoryModule } from './jewel-category/jewel-category.module';
import { HomeComponent } from './home/home.component';
import { JewelModelModule } from './jewel-model/jewel-model.module';
import { JewelModule } from './jewel/jewel.module';
import { CartModule } from './cart/cart.module';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AccountComponent } from './account/account.component';
import { UserModule } from './account/user.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JewelCategoryModule,
    AuthModule,
    HttpClientModule,
    JewelModelModule,
    JewelModule,
    CartModule,
    UserModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
