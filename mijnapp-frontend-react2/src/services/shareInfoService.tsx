import {SharedData_MOKE} from '../MOKE/MOKE';

const shareInfoService = {
    getOrganizationsWithAccess: (): Promise<any> => {
        return new Promise<any>(resolve => setTimeout(() => resolve(SharedData_MOKE.getOrganizationsWithAccess), 1000));
    },
    getDataToShare: (_id: string | null): Promise<any> => {
        return new Promise<any>(resolve => setTimeout(() => resolve(SharedData_MOKE.getDataToShare), 1000));
    },
    createShareData: (data: { dataId: string | null, uploadDate: Date, organizations: (string | null)[] }): Promise<any> => {
        return new Promise<any>(resolve => setTimeout(() => resolve(true), 1000));
    },
    editShareData: (data: { dataId: string | null, uploadDate: Date, organizations: (string | null)[] }): Promise<any> => {
        return new Promise<any>(resolve => setTimeout(() => resolve(true), 1000));
    },
    getSharedData: (id: string): Promise<any> => {
        return new Promise<any>(resolve => setTimeout(() => resolve(SharedData_MOKE.getSharedData), 1000));
    },
    terminateSharingInfo: (id: string): Promise<any> => {
        return new Promise<any>(resolve => setTimeout(() => resolve(true), 1000));
    }
};

export default shareInfoService;
