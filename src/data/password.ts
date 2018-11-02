import * as crypto from 'crypto';
import { ObjectId } from 'mongodb';

import BaseService from '@src/data/base';

import Password from '@src/models/password';

const ALGORITHM = 'aes-256-ctr';

class PasswordService extends BaseService {
    constructor() {
        super('passwords');
    }

    async get(key: string, search: string, start: number, count: number) {
        let collection = await this.collection();

        let query = {};
        if (search) {
            query = {
                $or: [
                    { domain: { $regex: new RegExp(search) } },
                    { username: { $regex: new RegExp(search) } }
                ]
                
            }
        }

        let cursor = await collection.find(query)
            .sort({ domain: 1, username: 1 })
            .skip(start)
            .limit(count);

        let passwords = await cursor.toArray();
        let hash = this.hash(key);
        passwords.forEach(p => {
            let textParts = p.password.split(':');
            let iv = new Buffer(textParts.shift(), 'hex');
            let encryptedText = new Buffer(textParts.join(':'), 'hex');
            let decipher = crypto.createDecipheriv(ALGORITHM, new Buffer(hash), iv);
            let decrypted = decipher.update(encryptedText);
            p.password = Buffer.concat([decrypted, decipher.final()]).toString();
        });
        return passwords;
    }

    async upsert(password: Password, key: string) {
        password.password = this.encryptPassword(password.password, key);

        let collection = await this.collection();
        await collection.replaceOne({
            _id: password._id
        }, password, {
            upsert: true
        });
    }

    async delete(password: Password) {
        let collection = await this.collection();
        await collection.deleteOne({
            _id: new ObjectId(password._id)
        });
    }

    private hash(key: string) {
        return crypto.createHash('md5').update(key).digest('hex');
    }

    private encryptPassword(password: string, key: string) {
        let iv = crypto.randomBytes(16);
        let cipher = crypto.createCipheriv(ALGORITHM, new Buffer(this.hash(key)), iv);
        let encrypted = cipher.update(password);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }
}

export default new PasswordService();

// function encrypt(text) {
//     let iv = crypto.randomBytes(IV_LENGTH);
//     let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
//     let encrypted = cipher.update(text);
  
//     encrypted = Buffer.concat([encrypted, cipher.final()]);
  
//     return iv.toString('hex') + ':' + encrypted.toString('hex');
//   }