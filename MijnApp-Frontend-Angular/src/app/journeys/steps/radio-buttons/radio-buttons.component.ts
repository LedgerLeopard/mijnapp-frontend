import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { order } from '../steps.component';

@Component({
  selector: 'app-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.scss']
})
export class RadioButtonsComponent implements OnInit {
  @Input() order: order;
  @Input() question: any;
  @Output() back = new EventEmitter<any>();
  @Output() next = new EventEmitter<any>();
  @Output() removeOrders = new EventEmitter<any>();
  @Output() nextId= new EventEmitter<any>();
  loading = true;
  previousValue: any;
  constructor() { }

  ngOnInit() {
    if(!this.order) {
      this.order = new order();
      this.order.question = this.question.id;
      this.order.key = this.question.key || this.question.property;
      this.order.keyTitle = this.question.key || this.question.property;
      this.order.value = "";
    } else {
      this.previousValue = this.order.value;
    }
    this.loading = false;
  }

  optionChange(option: any, title: string) {
    this.order.value = option.target.value;
    this.order.valueTitle = title;
  }

  nextAction() {
    if(!!this.previousValue && this.order.value !== this.previousValue) {
      const id = (this.question.options.find(o => o.value === this.previousValue)).goto;
      this.removeOrders.emit(id);
    }
    this.next.emit(this.order);
    const nextId = (this.question.options.find(o => o.value === this.order.value)).goto;
    this.nextId.emit(nextId);
  }

  backAction() {
    this.back.emit(this.question.id);
  }

}
