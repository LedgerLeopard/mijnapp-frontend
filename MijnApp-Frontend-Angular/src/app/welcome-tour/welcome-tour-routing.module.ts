import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArrangeYourselfComponent } from './arrange-yourself/arrange-yourself.component';
import { OwnDashboardComponent } from './own-dashboard/own-dashboard.component';
import { AlwaysSafeComponent } from './always-safe/always-safe.component';


const routes: Routes = [
  { path: '', component: ArrangeYourselfComponent },
  { path: 'dashboard', component: OwnDashboardComponent },
  { path: 'always-safe', component: AlwaysSafeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeTourRoutingModule { }
