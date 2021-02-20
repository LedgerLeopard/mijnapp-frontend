import AuthStore from '../stores/AuthStore';

export default class Stores {
    authStore: AuthStore;

    constructor() {
        this.authStore = new AuthStore();
    }
}
