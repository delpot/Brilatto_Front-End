import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JewelCategoryModule } from './jewel-category/jewel-category.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, JewelCategoryModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
