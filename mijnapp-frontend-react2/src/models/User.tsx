export default class User {
    _id: string | undefined | null;
    token: string | undefined | null;
    login: string | undefined | null;
    firstName: string | undefined | null;
    lastName: string | undefined | null;
    birthday: string | undefined | null;
    BSN: string | undefined | null;
    birthplace: string | undefined | null;
    countryBirth: string | undefined | null;
    marriage: string | undefined | null;
    children: string | undefined | null;
    avatar: string | undefined | null;
    email: string | undefined | null;

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
