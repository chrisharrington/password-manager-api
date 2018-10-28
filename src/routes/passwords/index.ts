import { Application } from 'express';

import Get from './get';

export default (app: Application) => {
    [
        Get
    ].forEach(route => route(app, '/passwords'));
};