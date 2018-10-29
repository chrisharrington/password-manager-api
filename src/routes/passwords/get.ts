import { Application, Request, Response } from 'express';

import PasswordService from '@src/data/password';

export default (app: Application, endpoint: string) => {
    app.get(endpoint, async (request: Request, response: Response) => {
        try {
            const key = 'this is a very secure key';
            let passwords = await PasswordService.get(key, request.query.search, parseInt(request.query.page), parseInt(request.query.count));
            response.status(200).send(passwords);
        } catch (e) {
            response.status(500).send(e.toString());
        }
    });
}