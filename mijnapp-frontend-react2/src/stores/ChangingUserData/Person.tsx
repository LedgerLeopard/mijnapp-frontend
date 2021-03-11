import {action, makeAutoObservable} from 'mobx';

export default class Person {
    _id: string;
    name: string;
    date: Date;
    checked: boolean;

    constructor(data?: any) {
        makeAutoObservable(this);
        this._id = data._id;
        this.name = data.name;
        this.date = new Date(data.date);
        this.checked = false;
    }

    markPerson = action(() => {
        this.checked = !this.checked;
    });
}
