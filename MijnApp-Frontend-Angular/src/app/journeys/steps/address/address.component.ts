import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { PersonalInformationService } from 'src/app/homepage/personal-information/personal-information.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SearchService } from '../../search.service';
import { order } from '../steps.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  personalInfo: any;
  loading = true;
  @Input() order: order;
  @Input() question: any;
  @Input() addressForm: FormGroup;
  isvalidAddress: boolean = true;
  isValidResidence: boolean = true;
  @Output() back = new EventEmitter<any>();
  @Output() form = new EventEmitter<any>();
  @Output() next = new EventEmitter<any>();

  constructor(private personalInfoService: PersonalInformationService, private toastr: ToastrService,
    private build: FormBuilder, private searchService: SearchService) {
  }

  ngOnInit() {
    if (typeof (this.addressForm) === 'undefined') {
      this.personalInfoService.getPersonalInformation().then(res => {
        this.personalInfo = res;
        this.bindForm();
      }).catch(e => console.error(e));
    } else {
      this.loading = false;
    }
  }

  bindForm() {
    this.addressForm = this.build.group({
      id: [null],
      huisnummer: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      postcode: ['', [Validators.required, this.postCodeValidator.bind(this)]],
      huisnummertoevoeging: ['', Validators.pattern('[0-9A-Za-z]*')],
      straatnaam: [''],
      woonplaatsnaam: ['']
    })
    this.loading = false;
  }

  postCodeValidator(): Validators | null {
    if (!this.addressForm || !this.value('postcode')) return null;
    const NAMES_REGEXP = /^[1-9][0-9]{3}[a-zA-Z]{2}/;
    if (NAMES_REGEXP.test(this.value('postcode'))) {
      return null;
    }
    return { invalid: true };
  }

  control(controlName: string): AbstractControl {
    return this.addressForm.get(controlName);
  }

  value(controlName: string) {
    return this.control(controlName).value;
  }

  showError(controlName: string): boolean {
    return this.control(controlName).touched && this.control(controlName).invalid;
  }

  getAddress() {
    if (this.addressForm.invalid) return null;
    const postcode = this.value("postcode"),
      houseNumber = this.value("huisnummer"),
      addition = this.value("huisnummertoevoeging") || null
    this.isValidResidence = true;
    this.searchService.GetAddress(postcode, houseNumber, addition).then(res => {
      const data = JSON.parse(res);
      if (data["adressen"].length > 0) {
        this.isvalidAddress = true;
        this.control('id').setValue(data["adressen"][0]["id"])
        this.control('woonplaatsnaam').setValue(data["adressen"][0]["woonplaats"]);
        this.control('straatnaam').setValue(data["adressen"][0]["straat"]);
      } else {
        this.isvalidAddress = false;
      }
    }).catch(e => {
      this.toastr.error(e['message']);
    });
  }

  nextAction() {
    const woonplaats = this.value('woonplaatsnaam');
    if (woonplaats !== '\'s-Hertogenbosch'
      && woonplaats !== 'Rosmalen'
      && woonplaats !== 'Nuland'
      && woonplaats !== 'Vinkel') {
      this.isValidResidence = false;
    } else {
      this.isValidResidence = true;
      if (!this.order) {
        this.order = new order();
        this.order.question = this.question.id;
        this.order.key = this.question.key || this.question.property;
        this.order.keyTitle = this.question.fieldName;
      }
      this.order.value = this.value('id');
      this.order.valueTitle = `${this.value('straatnaam')} ${this.value('huisnummer')}  ${this.value('huisnummertoevoeging')},
      ${this.value('postcode')}  ${this.value('woonplaatsnaam')} `;
      this.form.emit(this.addressForm);
      this.next.emit(this.order);
    }
  }

  backAction() {
    this.back.emit(this.question.id);
  }
}
