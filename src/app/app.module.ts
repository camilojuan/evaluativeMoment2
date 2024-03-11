import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PorcinoController } from './controllers/porcino.controller';
import { NutritionController } from './controllers/nutrition.controller';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NutritionModel } from './model/nutrition';

@NgModule({
  declarations: [
    AppComponent,
    PorcinoController,
    NutritionController,
    PorcinoController
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,CommonModule,FormsModule
  ],
  providers: [NutritionModel],
  bootstrap: [AppComponent]
})
export class AppModule { }