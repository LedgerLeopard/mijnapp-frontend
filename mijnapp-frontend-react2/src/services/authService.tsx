import api from '../api/api';
import User from '../models/User';

const authService = {
    login: (login: string, password: string): Promise<User> => {
        return new Promise<User>(resolve => {
            setTimeout(() => resolve(new User({
                _id: '_id',
                token: 'token',
                login: 'Login',
                firstName: 'Henk',
                lastName: 'de Vries',
                birthday: '13-04-1984',
                serviceNumber: '12345678',
                birthplace: 'Utrecht',
                countryBirth: 'Nederland',
                marriage: 'Evelien de Vries',
                children: 'Paul de Vries',
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
                firstName: 'Henk',
                lastName: 'de Vries',
                birthday: '13-04-1984',
                serviceNumber: '12345678',
                birthplace: 'Utrecht',
                countryBirth: 'Nederland',
                marriage: 'Evelien de Vries',
                children: 'Paul de Vries',
                avatar: 'https://ifcviewerblobstorage.blob.core.windows.net/cirlinq-ifc/ou491rxps6feoxbndi1qt_84854.jpg'
            })), 1000);
        });
    },
    // login: (login: string, password: string): Promise<User> => api.post(`/jwt/signinfake`, {isPublic: true, data: {login, password}}),
    // me: (): Promise<User> => api.get('/me');
};

export default authService;
