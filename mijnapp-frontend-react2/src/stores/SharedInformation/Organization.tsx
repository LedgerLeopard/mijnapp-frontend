import {action, makeAutoObservable} from 'mobx';


export class Organization {
    _id: string | null = null;
    name: string | null = null;
    logo: string | null = null;
    use: boolean = true;

    constructor(data?: any) {
        this._id = data._id;
        this.name = data.name;
        this.logo = data.logo;
        this.use = true;
        makeAutoObservable(this);
    }

    markOrganization = action((checked: boolean) => this.use = checked);
}
