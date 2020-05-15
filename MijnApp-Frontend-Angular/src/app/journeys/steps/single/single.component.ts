import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { order } from '../steps.component';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {
  @Input() order: order;
  @Input() question: any;
  @Output() back = new EventEmitter<any>();
  @Output() next = new EventEmitter<any>();
  @Output() removeOrders = new EventEmitter<any>();
  @Output() nextId= new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  
  optionClick(option: any) {
    if(!this.order) {
      this.order = new order();
      this.order.question = this.question.id;
      this.order.key = this.question.key || this.question.property;
      this.order.keyTitle = this.question.key || this.question.property;
    } else {
      if(this.order.value !== option.value) {
        const id = (this.question.options.find(o => o.value === this.order.value)).goto;
        this.removeOrders.emit(id);
      }
    }
    this.order.value = option.value;
    this.order.valueTitle = option.value;
    this.next.emit(this.order);
    this.nextId.emit(option.goto);
  }

  backAction() {
    this.back.emit(this.question.id);
  }
}
