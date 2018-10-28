import { Application, Request, Response } from 'express';

import User from '@src/models/user';

export default (app: Application, endpoint: string) => {
    app.post(endpoint, (request: Request, response: Response) => {
        let user = new User();
        user.firstName = 'Chris';
        user.lastName = 'Harrington';
        user.email = 'chrisharrington99@gmail.com';
        response.status(200).send(JSON.stringify(user));
    });
}