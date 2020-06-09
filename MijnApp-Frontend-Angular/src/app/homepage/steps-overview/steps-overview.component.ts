import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-steps-overview',
  templateUrl: './steps-overview.component.html',
  styleUrls: ['./steps-overview.component.scss']
})
export class StepsOverviewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backPage() {
    this.router.navigate(["/homepage"]);
  }

}
