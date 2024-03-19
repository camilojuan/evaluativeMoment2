import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PorcinoController } from './controllers/porcino.controller';
import { NutritionController } from './controllers/nutrition.controller';
import { ClienteController } from './controllers/client.controller';
import { ReportExcelController } from './controllers/reportExcel.controller';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NutritionModel } from './model/nutrition';
import { ClienteModel } from './model/client';
import { PorcinoModel } from './model/porcino';


import { NavComponent } from './component/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    PorcinoController,
    NutritionController,
    NavComponent,
    ClienteController
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,CommonModule,FormsModule
  ],
  providers: [
    NutritionModel,
    ClienteModel,
    PorcinoModel
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
