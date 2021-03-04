import {makeObservable, observable} from 'mobx';


export class TrackingData {
    _id: string | null = null;
    name: string | null = null;
    action: string | null = null;
    date: Date | null = null;

    constructor(data?: any) {
        makeObservable(this, {
            _id: observable,
            name: observable,
            action: observable,
            date: observable,
        });
        Object.assign(this, data);
    }
}
