import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { order } from '../steps.component';

@Component({
  selector: 'app-agree',
  templateUrl: './agree.component.html',
  styleUrls: ['./agree.component.scss']
})
export class AgreeComponent implements OnInit {
  @Input() order: order;
  @Input() question: any;
  @Output() back = new EventEmitter<any>();
  @Output() next = new EventEmitter<any>();
  isAgree: boolean;
  constructor() { }

  ngOnInit() {
    this.isAgree = !!order;
    if(!this.order) {
      this.order = new order();
      this.order.question = this.question.id;
      this.order.key = this.question.key || this.question.property;
      this.order.keyTitle = this.question.key || this.question.property;
    }
  }

  checkBoxEvent(event: any) {
    this.isAgree = event.target.checked;
  }

  nextAction() {
    this.order.value = true;
    this.order.valueTitle = 'Ja';
    this.next.emit(this.order);
  }

  backAction() {
    this.back.emit(this.question.id);
  }

}
