import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { PersonalInformationService } from '../../../homepage/personal-information/personal-information.service';
import { order } from '../steps.component';

@Component({
  selector: 'app-persons-moving',
  templateUrl: './persons-moving.component.html',
  styleUrls: ['./persons-moving.component.scss']
})
export class PersonsMovingComponent implements OnInit {
  persons: any;
  @Input() order: order;
  @Input() question: any;
  @Output() back = new EventEmitter<any>();
  @Output() next = new EventEmitter<any>();

  constructor(private personInfoService: PersonalInformationService) {
    this.personInfoService.GetPersonsMovingAsync().then(res => {
      this.persons = res;
    });
  }

  ngOnInit() {
    if (!this.order) {
      this.order = new order();
      this.order.value = [];
      this.order.valueTitle = [];
    }
  }

  checkBoxEvent(event: any, person: any) {
    if (event.target.checked) {
      this.order.value.push(event.target.value);
      const title = `${person.naam.aanschrijfwijze}, geboren op ${person.geboorte.datum.date}`;
      this.order.valueTitle.push(title);
    } else {
      const index = this.order.value.findIndex(x => x == event.target.value);
      this.order.value.splice(index, 1);
      this.order.valueTitle.splice(index, 1);
    }
  }

  nextAction() {
    this.order.question = this.question.id;
    this.order.key = this.question.key || this.question.property;
    this.order.keyTitle = this.question.fieldName;
    this.next.emit(this.order);
  }

  backAction() {
    this.back.emit(this.question.id);
  }
}

