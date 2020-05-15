import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { journeys } from './mock-data';
import { ActivatedRoute, Router } from '@angular/router';

export class order {
  question: string;
  key: any;
  value: any;
  keyTitle: string;
  valueTitle: any;
}

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {
  question: any;
  orders: order[] = [];
  journey: any;
  questions: any;
  currentId: string;
  nextId: string;
  order: order;
  type: string;
  addressForm: FormGroup;
  moveDateForm: FormGroup;
  constructor(private build: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.journey = journeys.find(x => x.request_type_id === params.id);
    });
   }

  ngOnInit() {
    this.questions = this.journey.questions;
    this.order = null;
    this.question = this.questions[0];
    this.type = this.question.type;
    this.nextId = this.question['next'] || null;
  }

  backPage(id: string) {
    const index = this.orders.findIndex(x => x.question === id);
    const lastIndex = this.orders.length -1;
    if(index === 0 || this.orders.length === 0) {
      this.router.navigate(['journeys/search-overview'], { queryParams: { id: this.journey.request_type_id }});
    } else {
    this.order = index !== -1 ? this.orders[index-1] : this.orders[lastIndex];
    this.question = this.questions.find(x => x.id === this.order.question);
    this.type = this.question.type;
    this.nextId = id;
    }
  }

  nextPage(order: order) {
    const index = !!this.orders && this.orders.findIndex(x => x.question === order.question);
    if(index !== -1) {
      this.orders.splice(index, 1, order);
    } else {
      this.orders.push(order);
    }
    this.setParams(this.nextId);
  }

  setParams(nextId: string) {
    if(!!nextId) {
    const next = this.orders.find(x => x.question === nextId);
    this.order = !!next ? next : null;
    this.question = this.questions.find(x => x.id === nextId);
    this.type = !!this.question ? this.question.type: "END"
    this.nextId = !!this.question ?this.question.next: null;
    }
  }

  removeOrders(id) {
    this.nextId = null;
    const isorder = this.orders.some(x => x.question === id );
    if(isorder) {
      this.orders = this.orders.filter(x => x.question !== id);
      const question = this.questions.find(x => x.id === id);
      this.removeOrders(question.nextId);
    }
   
  }
}
