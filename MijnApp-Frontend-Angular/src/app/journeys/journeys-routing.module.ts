import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StepsOverviewComponent } from './steps-overview/steps-overview.component';
import { JourneysComponent } from './journeys.component';

const routes: Routes = [
  {
    path: '',
    component: JourneysComponent
  },
  {
    path: 'search-overview',
    component: StepsOverviewComponent
  },
  {
    path: 'journey',
    loadChildren: () => import('././steps/steps.module').then(m => m.StepsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JourneysRoutingModule { }
