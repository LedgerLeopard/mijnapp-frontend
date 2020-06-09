import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JourneysRoutingModule } from './journeys-routing.module';
import { StepsOverviewComponent } from './steps-overview/steps-overview.component';
import { SharedModule } from '../shared/shared.module';
import { JourneysComponent } from './journeys.component';

@NgModule({
  declarations: [
    StepsOverviewComponent, JourneysComponent
  ],
  imports: [
    SharedModule,
    JourneysRoutingModule
  ]
})
export class JourneysModule { }
