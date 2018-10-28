import { MongoClient, Db } from 'mongodb';

import Config from '@src/config';

class Connection {
    client: MongoClient;
    db: Db;

    init() : Promise<Db> {
        return new Promise<Db>((resolve, reject) => {
            this.client = new MongoClient(Config.storeUrl);

            this.client.connect(err => {
                if (err) return reject(err);
                
                const db = this.client.db(Config.storeDatabase);
                this.db = db;
                resolve(db);
            });
        });
    }

    close() {
        if (this.client)
            this.client.close();
    }
}

export default new Connection();