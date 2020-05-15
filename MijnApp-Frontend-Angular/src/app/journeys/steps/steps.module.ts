import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepsRoutingModule } from './steps-routing.module';
import { StepsComponent } from './steps.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EndJourneyComponent } from './end-journey/end-journey.component';
import { AddressComponent } from './address/address.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PersonsMovingComponent } from './persons-moving/persons-moving.component';
import { MultipleTextComponent } from './multiple-text/multiple-text.component';
import { SingleComponent } from './single/single.component';
import { AgreeComponent } from './agree/agree.component';
import { TextComponent } from './text/text.component';
import { RadioButtonsComponent } from './radio-buttons/radio-buttons.component';


@NgModule({
  declarations: [StepsComponent, EndJourneyComponent, AddressComponent, CalendarComponent, PersonsMovingComponent, MultipleTextComponent, SingleComponent, AgreeComponent, TextComponent, RadioButtonsComponent],
  imports: [
    CommonModule,
    SharedModule,
    StepsRoutingModule
  ]
})
export class StepsModule { }
