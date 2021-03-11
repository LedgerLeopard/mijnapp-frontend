import {ChangingUserData_MOKE} from '../MOKE/MOKE';

const dataChangeService = {
    searchAddress: (postcode?: string, houseNumber?: string, additionalData?: string | null): Promise<any> => {
        return new Promise<any>(resolve => setTimeout(() => resolve(ChangingUserData_MOKE.searchAddress), 1000));
    },
    getListPeople: (id: string): Promise<any> => {
        return new Promise<any>(resolve => setTimeout(() => resolve(ChangingUserData_MOKE.getListPeople), 1000));
    },
    changeUserData: (data: any): Promise<any> => {
        return new Promise<any>(resolve => setTimeout(() => resolve(true), 1000));
    }
};

export default dataChangeService;
