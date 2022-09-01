import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HeaderComponent } from './header/header.component';
import { JewelCategoryModule } from './jewel-category/jewel-category.module';
import { HomeComponent } from './home/home.component';
import { JewelModelModule } from './jewel-model/jewel-model.module';
import { JewelsListComponent } from './jewel/components/jewels-list/jewels-list.component';
import { JewelDetailsComponent } from './jewel/components/jewel-details/jewel-details.component';
import { JewelModule } from './jewel/jewel.module';

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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
