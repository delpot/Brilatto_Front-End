import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { JewelDetailsComponent } from './components/jewel-details/jewel-details.component';
import { JewelsListComponent } from './components/jewels-list/jewels-list.component';

@NgModule({
  declarations: [JewelDetailsComponent, JewelsListComponent],
  providers: [],
  imports: [CommonModule, AppRoutingModule, ReactiveFormsModule],
  exports: [],
})
export class JewelModule {}
