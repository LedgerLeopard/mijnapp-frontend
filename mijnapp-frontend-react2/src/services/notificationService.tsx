import {Notification_MOKE} from '../MOKE/MOKE';

const notificationService = {
    getNotifications: (): Promise<any> => {
        return new Promise<any>(resolve => setTimeout(() => resolve(Notification_MOKE.getNotifications), 1000));
    }
};

export default notificationService;
