import { Application } from 'express';

import Get from './get';
import Delete from './delete';

export default (app: Application) => {
    [
        Get,
        Delete
    ].forEach(route => route(app, '/passwords'));
};