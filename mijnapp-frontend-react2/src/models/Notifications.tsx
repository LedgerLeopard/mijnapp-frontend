export default class Notifications {
    _id: string;
    dataId: string;
    logo: string;
    text: string;
    status: string;
    date: Date;

    constructor(data?: any) {
        this._id = data._id;
        this.dataId = data.dataId;
        this.logo = data.logo;
        this.text = data.text;
        this.status = data.status;
        this.date = new Date(data.date);
    }
}
