import {action, makeObservable, observable} from 'mobx';


export class Organization {
    _id: string | null = null;
    name: string | null = null;
    logo: string | null = null;
    use: boolean = true;

    constructor(data?: any) {
        makeObservable(this, {
            _id: observable,
            name: observable,
            logo: observable,
            use: observable
        });
        Object.assign(this, data);
    }

    markOrganization = action((checked: boolean) => this.use = checked);
}
