import AuthStore from '../stores/AuthStore';
import PopupUiStore from '../stores/PopupUiStore';

export default class Stores {
    authStore: AuthStore;
    popupUiStore: PopupUiStore;

    constructor() {
        this.authStore = new AuthStore();
        this.popupUiStore = new PopupUiStore();
    }
}
