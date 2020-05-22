import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { journeys } from '../steps/mock-data';

@Component({
  selector: 'app-steps-overview',
  templateUrl: './steps-overview.component.html',
  styleUrls: ['./steps-overview.component.scss']
})
export class StepsOverviewComponent implements OnInit {
  preconditionsFullFilled = false;
  loading = true;
  journeys = journeys;
  journey: any;
  constructor(private searchService: SearchService, private route: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.journey = this.journeys.find(x => x.request_type_id === params.id);
    });
    this.searchService.checkPreconditions().then(res => {
    this.preconditionsFullFilled = res['preconditionsFullFilled'];
    }).catch(e => console.error(e))
    .finally(() => this.loading = false);
  }
}
