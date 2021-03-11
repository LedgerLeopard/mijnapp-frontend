import {action, makeAutoObservable, toJS} from 'mobx';
import {Organization} from './Organization';
import {Info} from './Info';
import {TrackingData} from './TrackingData';


export default class SharedInfo {
    _id: string | null = null;
    infoId: string | null = null;
    info: Info = Object(null);
    organizations: Organization[] = [];
    uploadDate: Date = new Date();
    trackingData: TrackingData[] = [];

    constructor(data?: any) {
        makeAutoObservable(this);
        Object.assign(this, data);
    }

    setSharedData = action((data: any) => {
        Object.assign(this, data);
    });

    addOrganization = action((organization: Organization) => {
        if (this.organizations.some(o => o._id === organization._id)) return;
        this.organizations.push(organization);
    });

    setUploadDate = action((date: Date | null) => {
        this.uploadDate = date ? date : new Date();
    });

    getShareData = action((): { _id: string | null, dataId: string | null, uploadDate: Date, organizations: (string | null)[] } => {
        return {
            _id: this._id,
            dataId: this.infoId,
            organizations: toJS(this.organizations.filter(organization => organization.use).map(organization => organization._id)),
            uploadDate: this.uploadDate
        };
    });

    clearStore = action(() => {
        this._id = null;
        this.infoId = null;
        this.info = Object(null);
        this.organizations = [];
        this.uploadDate = new Date();
        this.trackingData = [];
    });
}

