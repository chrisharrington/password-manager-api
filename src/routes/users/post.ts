import { Application, Request, Response } from 'express';

import UserService from '@src/data/user';

export default (app: Application, endpoint: string) => {
    app.post(endpoint, async (request: Request, response: Response) => {
        try {
            let user = await UserService.signIn(request.body.email, request.body.password);
            response.status(200).send(user); 
        } catch (e) {
            response.status(500).send(e);
        }
    });
}