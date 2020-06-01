import { Component, OnInit } from '@angular/core';
import { PersonalInformationService } from './personal-information.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  personalInfo: any;

  constructor(private personalInfoService: PersonalInformationService, private router: Router) { }

  ngOnInit() {
    this.personalInfoService.getPersonalInformation().then(res => {
      this.personalInfo = res;
    }).catch(e => console.error(e));
  }

  backPage() {
    this.router.navigate(["homepage"]);
  }

}
