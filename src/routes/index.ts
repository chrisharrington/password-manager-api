import { Application } from 'express';

import Users from './users';
import Passwords from './passwords';

class Routes {
    init(app: Application) {
        [
            Users,
            Passwords
        ].forEach(route => route(app));
    }
}

export default new Routes();