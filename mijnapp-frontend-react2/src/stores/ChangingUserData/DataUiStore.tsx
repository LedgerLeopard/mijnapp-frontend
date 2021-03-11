import {action, makeAutoObservable} from 'mobx';
import {ValidatedValue} from '../../models/ValidatedValue';
import {checkValue} from '../../share/formValidation';
import {nlPostCode, number, email, phoneNumber} from '../../share/constants/regExp';
import DataStore from './DataStore';
import Person from './Person';


export default class DataUiStore {
    [key: string]: any;

    postcode: ValidatedValue = {value: '', valid: true, required: true};
    houseNumber: ValidatedValue = {value: '', valid: true, required: true};
    additionalData: ValidatedValue = {value: '', valid: true, required: false};
    date: Date | string = '';
    month: Date | string = '';
    year: Date | string = '';
    addresses: { _id: string, data: string }[] = [];
    people: Person[] = [];
    email: ValidatedValue = {value: '', valid: true, required: true};
    phone: ValidatedValue = {value: '', valid: true, required: true};

    constructor() {
        makeAutoObservable(this);
    }

    setUiData = action((data: any) => {
        Object.assign(this, data);
    });

    setUiDate = action((field: string, date: Date | null, dataStore: DataStore) => {
        this[field] = date;
        if (!this.date || !this.month || !this.year) return;
        if (this.date instanceof Date && this.month instanceof Date && this.year instanceof Date) {
            const movingDate = new Date([(this.month.getMonth() + 1), this.date.getDate(), this.year.getFullYear()].join('-'));
            dataStore.setChangingUserData({movingDate});
        }
    });

    setValidatedUiData = action((field: string, data: any) => {
        if (!this[field]) return;
        this[field].value = data;
        this.validation(field);
    });

    validation = action((field: string) => {
        switch (field) {
            case 'postcode':
                this.checkValue(field, nlPostCode);
                break;
            case 'houseNumber':
                this.checkValue(field, number);
                break;
            case 'email':
                this.checkValue(field, email);
                break;
            case 'phone':
                this.checkValue(field, phoneNumber);
                break;
        }
    });

    checkValue = action((field: string, regExp: RegExp | string) => {
        checkValue(this, field, regExp);
    });


    clearData = action(() => {
        this.postcode = {value: '', valid: true, required: true};
        this.houseNumber = {value: '', valid: true, required: true};
        this.additionalData = {value: '', valid: true, required: false};
        this.date = '';
        this.month = '';
        this.year = '';
        this.addresses = [];
        this.people = [];
        this.email = {value: '', valid: true, required: false};
        this.phone = {value: '', valid: true, required: false};
    });
}
