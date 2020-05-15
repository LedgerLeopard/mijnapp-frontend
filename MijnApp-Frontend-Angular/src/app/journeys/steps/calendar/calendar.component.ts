import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { order } from '../steps.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  loading = true;
  @Input() order: order;
  @Input() question: any;
  @Input() moveDateForm: FormGroup;
  @Output() back = new EventEmitter<any>();
  @Output() form = new EventEmitter<any>();
  @Output() next = new EventEmitter<any>();

  constructor(private build: FormBuilder) { }

  ngOnInit() {
    if (typeof (this.moveDateForm) === 'undefined') {
      this.bindForm();
    } else {
      this.loading = false;
    }
  }

  bindForm() {
    this.moveDateForm = this.build.group({
      dag: ['', [Validators.required, Validators.pattern('^([1-9]|1[0-9]|2[0-9]|3[01])$')]],
      maand: ['', [Validators.required, Validators.pattern('^([1-9]|1[012])$')]],
      jaar: ['', [Validators.required]]
    });

    this.loading = false;
  }

  control(controlName: string): AbstractControl {
    return this.moveDateForm.get(controlName);
  }

  value(controlName: string) {
    return this.control(controlName).value;
  }

  showError(controlName: string): boolean {
    return this.control(controlName).touched && this.control(controlName).invalid;
  }

  nextAction() {
    if (!this.order) {
      this.order = new order();
      this.order.question = this.question.id;
      this.order.key = this.question.key || this.question.property;
      this.order.keyTitle = this.question.fieldName;
    }
    this.order.value = new Date(this.value('jaar'), this.value('maand') - 1, this.value('dag'));
    this.order.valueTitle = `${this.value('dag')} - ${this.value('maand')} - ${this.value('jaar')}`;

    this.form.emit(this.moveDateForm);
    this.next.emit(this.order);
  }

  backAction() {
    this.back.emit(this.question.id);
  }
}
