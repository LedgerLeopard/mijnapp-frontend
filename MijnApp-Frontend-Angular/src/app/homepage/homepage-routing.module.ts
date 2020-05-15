import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage.component';
import { StepsOverviewComponent } from './steps-overview/steps-overview.component';
import { ShareDataComponent } from './steps/share-data/share-data.component';
import { SharePersonComponent } from './steps/share-person/share-person.component';
import { ShareTimeComponent } from './steps/share-time/share-time.component';
import { ConfirmSharingComponent } from './steps/confirm-sharing/confirm-sharing.component';
import { SharedSuccessfullyComponent } from './shared-successfully/shared-successfully.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { AddOrganizationComponent } from './steps/share-person/add-organization/add-organization.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'personal-information', component: PersonalInformationComponent },
  { path: 'steps-overview', component: StepsOverviewComponent },
  { path: 'share-data', component: ShareDataComponent },
  { path: 'share-person', component: SharePersonComponent },
  { path: 'add-organization', component: AddOrganizationComponent },
  { path: 'share-time', component: ShareTimeComponent },
  { path: 'confirm-sharing', component: ConfirmSharingComponent },
  { path: 'shared-successfully', component: SharedSuccessfullyComponent },
  { path: 'similarities', loadChildren: () => import('./similarities/similarities.module').then(m => m.SimilaritiesModule) },
  { path: 'shared-data', loadChildren: () => import('./shared-data/shared-data.module').then(m => m.SharedDataModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
