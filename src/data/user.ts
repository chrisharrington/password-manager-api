import Crypto from '@src/utilities/crypto';

import User from '@src/models/user';

import BaseService from './base';

class UserService extends BaseService {
    constructor() {
        super('users');
    }

    async signIn(email: string, password: string) : Promise<User> {
        let collection = await this.collection();
        return await collection.findOne({
            email,
            key: Crypto.hash(password)
        });
    }

    async add(user: User) {
        let collection = await this.collection();
        await collection.insertOne(user);
    }
}

export default new UserService();
