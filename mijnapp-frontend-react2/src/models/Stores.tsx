import AuthStore from '../stores/AuthStore';
import PopupUiStore from '../stores/PopupUiStore';
import SharedInfo from '../stores/SharedInformation/SharedInfo';

export default class Stores {
    authStore: AuthStore;
    popupUiStore: PopupUiStore;
    sharedInformationStore: SharedInfo;

    constructor() {
        this.authStore = new AuthStore();
        this.popupUiStore = new PopupUiStore();
        this.sharedInformationStore = new SharedInfo();
    }
}
