export default class User {
    _id: string | undefined | null;
    token: string | undefined | null;
    login: string | undefined | null;
    firstName: string | undefined | null;
    lastName: string | undefined | null;
    avatar: string | undefined | null;
    email: string | undefined | null;

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
