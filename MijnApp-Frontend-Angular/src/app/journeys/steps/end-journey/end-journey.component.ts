import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../../search.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-end-journey',
  templateUrl: './end-journey.component.html',
  styleUrls: ['./end-journey.component.scss']
})
export class EndJourneyComponent implements OnInit {
  @Input() orders: any;
  @Input() journey: any;
  questions: any;
  @Output() back = new EventEmitter<any>();
  loading = true
  constructor(private searchService: SearchService, private route: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.loading = !!this.orders ? false: true;
    this.questions = this.journey.questions;
  }

  getValues(value: any) {
    if(typeof(value) == 'string') {
      return [value];
    } else {
      return value;
    }
  }

  saveOrder() {
    this.searchService.saveOrder(this.orders, this.journey.request_type_id).then(res => {
        this.route.navigate(["../../../homepage/shared-successfully"]);
    }).catch(e => {
      this.orders.pop({"question": "END"});
      this.toastr.error(e['message']);
    })
  }

  backAction() {
    this.back.emit(null);
  }
}
