import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NutritionController } from './controllers/nutrition.controller';
import { ClienteController } from './controllers/client.controller';
import { PorcinoController } from './controllers/porcino.controller';

const routes: Routes = [

  {
    path:'',
    component:PorcinoController
  },
  {
    path:'',
    redirectTo: '/porcino',
    pathMatch: 'full'
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
    component: PorcinoController
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
