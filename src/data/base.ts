import { MongoClient, Collection } from 'mongodb';

import Config from '@src/config';

export default class BaseService {
    collection: string;

    constructor(collection: string) {
        this.collection = collection;
    }

    protected open() : Promise<Collection> {
        return new Promise<Collection>((resolve, reject) => {
            const client = new MongoClient(Config.storeUrl);

            client.connect(err => {
                if (err) return reject(err);

                const db = client.db(Config.storeDatabase);
                resolve(db.collection(this.collection));
            });
        });
    }
}