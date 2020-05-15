import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { order } from '../steps.component';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
  @Input() order: order;
  @Input() question: any;
  @Output() back = new EventEmitter<any>();
  @Output() next = new EventEmitter<any>();
  value = "";
  constructor() { }

  ngOnInit() {
    if(!!this.order) {
      this.value = this.order.value;
    }
  }

  nextAction() {
    if (!this.order) {
      this.order = new order();
      this.order.question = this.question.id;
      this.order.key = this.question.key || this.question.property;
      this.order.keyTitle = this.question.key || this.question.property;
    }
    this.order.value = this.value;
    this.order.valueTitle = this.value;
    this.next.emit(this.order);
  }

  backAction() {
    this.back.emit(this.question.id);
  }
}
