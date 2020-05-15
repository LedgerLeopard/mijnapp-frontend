import { Component, OnInit } from '@angular/core';
import { journeys } from './steps/mock-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journeys',
  templateUrl: './journeys.component.html',
  styleUrls: ['./journeys.component.scss']
})
export class JourneysComponent implements OnInit {
  journeys = journeys;
  constructor(private router: Router) {}

  ngOnInit() {
  }

}
