import {action, IObservableValue, observable} from 'mobx';
import User from '../models/User';
import authService from '../services/authService';


export default class AuthStore {
    token: IObservableValue<string | null> = observable.box(null);
    user: User = observable(Object(null));
    isLoading: IObservableValue<boolean> = observable.box(true);

    setUser = action((user: User | null) => Object.assign(this.user, user));

    setToken = action((data: any) => {
        this.token.set(data.token);
        data.token && data._id
            ? localStorage.setItem('token-' + data._id, data.token)
            : localStorage.removeItem('token-' + data._id);
        this.isLoading.set(false);
    });

    login = action((login: string, password: string): Promise<any> => {
        this.isLoading.set(true);
        return new Promise((resolve, reject) => {
            authService.login(login, password)
                .then(user => {
                    this.setUser(user);
                    this.setToken(user);
                    resolve(true);
                })
                .catch(error => reject(error));
        });
    });

    checkToken = action(() => {
        if (this.token.get()) return;
        this.isLoading.set(true);
        authService.me()
            .then(user => {
                this.setUser(user);
                this.setToken({token: localStorage.getItem('token-' + user._id), ...user});
            })
            .catch(() => this.isLoading.set(false));
    });

    clearUserData = action(() => {
        this.setToken({token: null});
        this.setUser(null);
    });
}
