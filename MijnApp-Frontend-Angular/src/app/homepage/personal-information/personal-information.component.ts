import { Component, OnInit } from '@angular/core';
import { PersonalInformationService } from './personal-information.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  personalInfo: any;

  constructor(private personalInfoService: PersonalInformationService) { }

  ngOnInit() {
    this.personalInfoService.getPersonalInformation().then(res => {
      this.personalInfo = res;
    }).catch(e => console.error(e));
  }

}
