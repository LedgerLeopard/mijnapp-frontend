import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimilaritiesComponent } from './similarities.component';
import { SimilaritiesOverviewComponent } from './similarities-overview/similarities-overview.component';


const routes: Routes = [
  {
    path: '',
    component: SimilaritiesComponent
  },
  {
    path: 'overview',
    component: SimilaritiesOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimilaritiesRoutingModule { }
