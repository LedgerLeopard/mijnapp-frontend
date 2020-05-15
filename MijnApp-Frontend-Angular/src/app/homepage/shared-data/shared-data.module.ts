import { NgModule } from '@angular/core';

import { SharedDataRoutingModule } from './shared-data-routing.module';
import { SharedDataOverviewComponent } from './shared-data-overview/shared-data-overview.component';
import { SharedDataComponent } from './shared-data.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [SharedDataComponent, SharedDataOverviewComponent],
  imports: [
    SharedModule,
    SharedDataRoutingModule
  ]
})
export class SharedDataModule { }
