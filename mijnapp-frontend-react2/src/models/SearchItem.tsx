import {SearchType} from '../share/constants/searchType';
import {ConfirmationStatus} from '../share/constants/confirmationStatus';

export class SearchItem {
    _id: string | undefined;
    type: SearchType | undefined;
    logo: string | undefined;
    name: string | undefined;
    address: string | undefined;
    additionalName?: string;
    status?: ConfirmationStatus;

    constructor(data: any) {
        Object.assign(this, data);
    }
}
