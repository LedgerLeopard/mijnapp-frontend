import api from '../api/api';
import User from '../models/User';
import {UserData_MOKE} from '../MOKE/MOKE';

const authService = {
    login: (login: string, password: string): Promise<User> => {
        return new Promise<User>(resolve => {
            setTimeout(() => resolve(new User(UserData_MOKE)), 1000);
        });
    },
    me: (): Promise<User> => {
        return new Promise<User>(resolve => {
            setTimeout(() => resolve(new User(UserData_MOKE)), 1000);
        });
    },
    // login: (login: string, password: string): Promise<User> => api.post(`/jwt/signinfake`, {isPublic: true, data: {login, password}}),
    // me: (): Promise<User> => api.get('/me');
};

export default authService;
