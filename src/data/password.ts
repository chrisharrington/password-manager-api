import * as crypto from 'crypto';

import BaseService from '@src/data/base';

import Password from '@src/models/password';

const algorithm = 'aes-256-ctr';

class PasswordService extends BaseService {
    constructor() {
        super('passwords');
    }

    get() {
        
    }

    async add(password: Password, key: string) {
        const cipher = crypto.createCipher(algorithm, key);
        let encrypted = cipher.update(password.password, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        password.password = encrypted;

        let collection = await this.open();
        await collection.insertOne(password);
    }
}

export default new PasswordService();