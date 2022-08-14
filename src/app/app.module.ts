import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HeaderComponent } from './header/header.component';
import { JewelCategoryModule } from './jewel-category/jewel-category.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JewelCategoryModule,
    AuthModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
