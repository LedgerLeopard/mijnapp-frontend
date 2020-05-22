import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { order } from '../steps.component';

@Component({
  selector: 'app-multiple-text',
  templateUrl: './multiple-text.component.html',
  styleUrls: ['./multiple-text.component.scss']
})
export class MultipleTextComponent implements OnInit {
  contactForm: FormGroup;
  questionData: any;
  @Input() order: order;
  @Input() set question(quen: any) {
    this.questionData = quen;
    this.bindForm();
  };
  @Output() back = new EventEmitter<any>();
  @Output() next = new EventEmitter<any>();
  loading = true;

  constructor(private build: FormBuilder) {
  }

  ngOnInit() {
  }

  bindForm() {
    this.contactForm = this.build.group({});
    if (!this.order) {
      this.order = new order();
      this.initOrder();
    }
    this.questionData.options.forEach(e => {
      this.contactForm.addControl(e.value, this.build.control('', [Validators.required, Validators.pattern(e.pattern)]))
    });

    if (!!order) {
      Object.keys(this.contactForm.controls).forEach((key, i) => {
        this.contactForm.controls[key].setValue(this.order.value[i]);
      });
    }
    this.loading = false;
  }

  control(controlName: string): AbstractControl {
    return this.contactForm.get(controlName);
  }

  value(controlName: string) {
    return this.control(controlName).value;
  }

  showError(controlName: string): boolean {
    return this.control(controlName).touched && this.control(controlName).invalid;
  }

  initOrder() {
    this.order.key = [];
    this.order.value = [];
    this.order.valueTitle = [];
  }

  nextAction() {
    this.order.question = this.questionData.id;
    this.order.keyTitle = this.questionData.fieldName;
    this.initOrder();
    Object.keys(this.contactForm.controls).forEach((key, i) => {
      this.order.key.push(key);
      this.order.value.push(this.value(key));
      this.order.valueTitle.push(this.value(key));
    });
    this.next.emit(this.order);
  }

  backAction() {
    this.back.emit(this.questionData.id);
  }

}
