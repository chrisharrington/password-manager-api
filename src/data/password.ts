import * as crypto from 'crypto';
import { ObjectId } from 'mongodb';

import BaseService from '@src/data/base';

import Password from '@src/models/password';

import Crypto from '@src/utilities/crypto';

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
        let hash = Crypto.hash(key);
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
        if (password._id) {
            password._id = new ObjectId(password._id) as any;
            await collection.replaceOne({
                _id: new ObjectId(password._id)
            }, password, {
                upsert: true
            });
        } else {
            delete password._id;
            await collection.insertOne(password);
        }
    }

    async delete(password: Password) {
        let collection = await this.collection();
        await collection.deleteOne({
            _id: new ObjectId(password._id)
        });
    }

    private encryptPassword(password: string, key: string) {
        let iv = crypto.randomBytes(16);
        let cipher = crypto.createCipheriv(ALGORITHM, new Buffer(Crypto.hash(key)), iv);
        let encrypted = cipher.update(password);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }
}

export default new PasswordService();