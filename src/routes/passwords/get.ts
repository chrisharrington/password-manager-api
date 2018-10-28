import { Application, Request, Response } from 'express';

import Password from '@src/models/password';

const data = require('../../../fixtures/passwords.json');

export default (app: Application, endpoint: string) => {
    app.get(endpoint, (request: Request, response: Response) => {
        let passwords = data.map((d, i) => {
            let password = new Password();
            password.id = i;
            password.domain = d.domain;
            password.username = d.username;
            password.password = d.password;
            return password;
        })
        response.status(200).send(passwords);
    });
}