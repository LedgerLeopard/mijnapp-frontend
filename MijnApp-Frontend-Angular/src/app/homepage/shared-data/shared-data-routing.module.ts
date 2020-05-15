import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedDataOverviewComponent } from './shared-data-overview/shared-data-overview.component';
import { SharedDataComponent } from './shared-data.component';

const routes: Routes = [
  {
    path: '',
    component: SharedDataComponent
  },
  {
    path: 'overview',
    component: SharedDataOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedDataRoutingModule { }
