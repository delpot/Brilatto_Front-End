import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { ModelsListComponent } from './components/models-list/models-list.component';
import { ModelDetailsComponent } from './components/model-details/model-details.component';

@NgModule({
  declarations: [ModelDetailsComponent, ModelsListComponent],
  providers: [],
  imports: [CommonModule, AppRoutingModule],
  exports: [],
})
export class JewelModelModule {}