import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { JewelDetailsComponent } from './components/jewel-details/jewel-details.component';
import { JewelsListComponent } from './components/jewels-list/jewels-list.component';

@NgModule({
  declarations: [JewelDetailsComponent, JewelsListComponent],
  providers: [],
  imports: [CommonModule, AppRoutingModule],
  exports: [],
})
export class JewelModule {}