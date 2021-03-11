import {makeAutoObservable} from 'mobx';

export class Info {
    _id: string | null = null;
    organizationLogo: string | null = null;
    organizationName: string | null = null;
    name: string | null = null;
    BSN: string | null = null;
    verificationType: string | null = null;
    status: string | null = null;

    constructor(data?: any) {
        makeAutoObservable(this);
        Object.assign(this, data);
    }
}
