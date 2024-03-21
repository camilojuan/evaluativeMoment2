import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NutritionController } from './controllers/nutrition.controller';
import { ClienteController } from './controllers/client.controller';
import { PorcinoController } from './controllers/porcino.controller';
import { ReportExcelController } from './controllers/reportExcel.controller';

const routes: Routes = [

  {
    path:'',
    component:ReportExcelController
  },
  {
    path:'',
    redirectTo: '/reportes',
    pathMatch: 'full'
  },
  {
    path: 'reportes',
    component: ReportExcelController
  },
  {
    path: 'porcino',
    component: PorcinoController
  },
  {
    path: 'cliente',
    component: ClienteController
  },
  {
    path: 'nutricion',
    component: NutritionController
  },
  
  {
    path: '**',
    component: ReportExcelController
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
