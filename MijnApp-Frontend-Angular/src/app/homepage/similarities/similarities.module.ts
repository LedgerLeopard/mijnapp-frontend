import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SimilaritiesRoutingModule } from './similarities-routing.module';
import { SimilaritiesComponent } from './similarities.component';
import { SimilaritiesOverviewComponent } from './similarities-overview/similarities-overview.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [SimilaritiesComponent, SimilaritiesOverviewComponent],
  imports: [
    SharedModule,
    SimilaritiesRoutingModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SimilaritiesModule { }
