import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { ModelsListComponent } from './components/models-list/models-list.component';
import { ModelDetailsComponent } from './components/model-details/model-details.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ModelDetailsComponent, ModelsListComponent],
  providers: [],
  imports: [CommonModule, AppRoutingModule, ReactiveFormsModule],
  exports: [],
})
export class JewelModelModule {}
