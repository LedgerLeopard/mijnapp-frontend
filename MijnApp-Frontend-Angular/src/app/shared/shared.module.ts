import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UiSwitchModule } from 'ngx-ui-switch';

import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [FooterComponent, BackButtonComponent, PrimaryButtonComponent, LoaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    UiSwitchModule,
    ToastrModule.forRoot(),
    CdkStepperModule
  ],
  exports: [
    FooterComponent,
    BackButtonComponent,
    LoaderComponent,
    PrimaryButtonComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BsDatepickerModule,
    ModalModule,
    UiSwitchModule,
    CdkStepperModule
  ]
})
export class SharedModule { }
