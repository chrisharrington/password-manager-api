import { Application, Request, Response } from 'express';

import PasswordService from '@src/data/password';
import Password from '@src/models/password';

export default (app: Application, endpoint: string) => {
    app.post(endpoint, async (request: Request, response: Response) => {
        try {
            const key = 'this is a very secure key';
            await PasswordService.add(request.body as Password, key);
        } catch (e) {
            response.status(500).send(e.toString());
        }
    });
}