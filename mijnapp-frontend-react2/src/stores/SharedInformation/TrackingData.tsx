import {makeAutoObservable} from 'mobx';


export class TrackingData {
    _id: string | null = null;
    name: string | null = null;
    action: string | null = null;
    date: Date | null = null;

    constructor(data?: any) {
        makeAutoObservable(this);
        Object.assign(this, data);
    }
}
