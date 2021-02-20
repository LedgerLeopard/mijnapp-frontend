import api from '../api/api';
import User from '../models/User';

const authService = {
    login: (login: string, password: string): Promise<User> => {
        return new Promise<User>(resolve => {
            setTimeout(() => resolve(new User({
                _id: '_id',
                token: 'token',
                login: 'Login',
                firstName: 'First Name',
                lastName: 'Last Name',
                avatar: 'https://ifcviewerblobstorage.blob.core.windows.net/cirlinq-ifc/ou491rxps6feoxbndi1qt_84854.jpg'
            })), 1000);
        });
    },
    me: (): Promise<User> => {
        return new Promise<User>(resolve => {
            setTimeout(() => resolve(new User({
                _id: '_id',
                token: 'token',
                login: 'Login',
                firstName: 'First Name',
                lastName: 'Last Name',
                avatar: 'https://ifcviewerblobstorage.blob.core.windows.net/cirlinq-ifc/ou491rxps6feoxbndi1qt_84854.jpg'
            })), 1000);
        });
    },
    // login: (login: string, password: string): Promise<User> => api.post(`/jwt/signinfake`, {isPublic: true, data: {login, password}}),
    // me: (): Promise<User> => api.get('/me');
};

export default authService;
