import {action, makeAutoObservable} from 'mobx';
import Person from './Person';


export default class DataStore {
    [key: string]: any;

    addressId: string | null = null;
    movingDate: Date | null = null;
    people: Person[] = [];
    email: string | null = null;
    phone: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setChangingUserData = action((data: any) => {
        Object.assign(this, data);
    });

    getChangedUserData = action(() => {
        return {
            addressId: this.addressId,
            movingDate: this.movingDate,
            people: this.people.map(person => person._id),
            email: this.email,
            phone: this.phone
        };
    });

    clearData = action(() => {
        this.addressId = null;
        this.movingDate = null;
        this.people = [];
        this.email = null;
        this.phone = null;
    });
}
