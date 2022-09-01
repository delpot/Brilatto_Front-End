import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { AllModelsComponent } from './components/all-models/all-models.component';
import { OneModelComponent } from './components/one-model/one-model.component';

@NgModule({
  declarations: [OneModelComponent, AllModelsComponent],
  providers: [],
  imports: [CommonModule, AppRoutingModule],
  exports: [],
})
export class JewelModelModule {}