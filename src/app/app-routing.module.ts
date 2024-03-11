import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NutritionController } from './controllers/nutrition.controller';

const routes: Routes = [

  {
    path:'',
    component:NutritionController
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
