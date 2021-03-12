import {Notification_MOKE} from '../MOKE/MOKE';

const notificationService = {
    getCount: (): Promise<any> => {
        return new Promise<any>(resolve => setTimeout(() => resolve(Notification_MOKE.getCount), 1000));
    },
    markAsRead: (id: string): Promise<any> => {
        return new Promise<any>(resolve => setTimeout(() => resolve(true), 200));
    },
    getNotifications: (): Promise<any> => {
        return new Promise<any>(resolve => setTimeout(() => resolve(Notification_MOKE.getNotifications), 1000));
    }
};

export default notificationService;
