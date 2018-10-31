import { Application, Request, Response } from 'express';

import Password from '@src/models/password';
import PasswordService from '@src/data/password';

export default (app: Application, endpoint: string) => {
    app.delete(endpoint, async (request: Request, response: Response) => {
        try {
            await PasswordService.delete(request.body as Password);
        } catch (e) {
            response.status(500).send(e.toString());
        }
    });
}