import { Application } from 'express';

import Post from './post';

export default (app: Application) => {
    [
        Post
    ].forEach(route => route(app, '/users'));
};