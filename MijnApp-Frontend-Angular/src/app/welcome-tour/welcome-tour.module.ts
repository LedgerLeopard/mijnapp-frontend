import { NgModule } from '@angular/core';

import { WelcomeTourRoutingModule } from './welcome-tour-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AlwaysSafeComponent } from './always-safe/always-safe.component';
import { ArrangeYourselfComponent } from './arrange-yourself/arrange-yourself.component';
import { OwnDashboardComponent } from './own-dashboard/own-dashboard.component';

@NgModule({
  declarations: [ArrangeYourselfComponent, OwnDashboardComponent, AlwaysSafeComponent],
  imports: [
    SharedModule,
    WelcomeTourRoutingModule
  ]
})
export class WelcomeTourModule { }
