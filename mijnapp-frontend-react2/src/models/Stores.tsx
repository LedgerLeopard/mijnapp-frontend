import AuthStore from '../stores/AuthStore';
import PopupUiStore from '../stores/PopupUiStore';
import SharedInfo from '../stores/SharedInformation/SharedInfo';
import DataStore from '../stores/ChangingUserData/DataStore';
import DataUiStore from '../stores/ChangingUserData/DataUiStore';
import UiStore from '../stores/UiStore';
import {CountNotificationStore} from '../stores/CountNotificationStore';

export default class Stores {
    authStore: AuthStore;
    popupUiStore: PopupUiStore;
    sharedInfoStore: SharedInfo;
    dataStore: DataStore;
    dataUiStore: DataUiStore;
    uiStore: UiStore;
    countNotification: CountNotificationStore;

    constructor() {
        this.authStore = new AuthStore();
        this.popupUiStore = new PopupUiStore();
        this.sharedInfoStore = new SharedInfo();
        this.dataStore = new DataStore();
        this.dataUiStore = new DataUiStore();
        this.uiStore = new UiStore();
        this.countNotification = new CountNotificationStore();
    }
}
