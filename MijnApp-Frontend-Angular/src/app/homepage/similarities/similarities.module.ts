import { NgModule } from '@angular/core';

import { SimilaritiesRoutingModule } from './similarities-routing.module';
import { SimilaritiesComponent } from './similarities.component';
import { SimilaritiesOverviewComponent } from './similarities-overview/similarities-overview.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [SimilaritiesComponent, SimilaritiesOverviewComponent],
  imports: [
    SharedModule,
    SimilaritiesRoutingModule
  ]
})
export class SimilaritiesModule { }
