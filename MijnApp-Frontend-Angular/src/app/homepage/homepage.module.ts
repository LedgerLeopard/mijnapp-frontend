import { NgModule } from '@angular/core';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { SharedModule } from '../shared/shared.module';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { StepsOverviewComponent } from './steps-overview/steps-overview.component';
import { ShareDataComponent } from './steps/share-data/share-data.component';
import { SharePersonComponent } from './steps/share-person/share-person.component';
import { ShareTimeComponent } from './steps/share-time/share-time.component';
import { ConfirmSharingComponent } from './steps/confirm-sharing/confirm-sharing.component';
import { SharedSuccessfullyComponent } from './shared-successfully/shared-successfully.component';
import { AddOrganizationComponent } from './steps/share-person/add-organization/add-organization.component';

@NgModule({
  declarations: [
    HomepageComponent, PersonalInformationComponent,
    StepsOverviewComponent, ShareDataComponent, SharePersonComponent,
    ShareTimeComponent, ConfirmSharingComponent, SharedSuccessfullyComponent,
    AddOrganizationComponent
  ],
  imports: [
    HomepageRoutingModule,
    SharedModule
  ]
})
export class HomepageModule { }
