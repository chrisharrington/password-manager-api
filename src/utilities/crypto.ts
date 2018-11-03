import * as crypto from 'crypto';

class Crypto {
    hash(value: string) {
        return crypto.createHash('sha256').update(value).digest('hex');
    }
}

export default new Crypto();