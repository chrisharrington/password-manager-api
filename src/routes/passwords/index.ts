import { Application } from 'express';

import Get from './get';
import Delete from './delete';
import Post from './post';

export default (app: Application) => {
    [
        Get,
        Delete,
        Post
    ].forEach(route => route(app, '/passwords'));
};