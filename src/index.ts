require('module-alias/register');

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { Db }  from 'mongodb';

import Config from './config';
import Routes from './routes';

import Logger from './logger';

import Connection from './data/connection';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use((request, response, next) => {
    Logger.info(`${request.method} ${request.originalUrl}: ${JSON.stringify(request.body)}`);
    next();
});

Routes.init(app);
Connection.init();

app.listen(Config.port, () => Logger.info(`Listening on port ${Config.port}...`));

// import PasswordService from '@src/data/password';
// import Password from '@src/models/password';

// const key = 'this is a very secure key';
// const passwords = require('../fixtures/passwords.json');
// passwords.forEach(async (password, i) => {
//     try {
//         let p = new Password();
//         p.domain = password.domain;
//         p.username = password.username;
//         p.password = password.password;
//         await PasswordService.upsert(p, key);
//         Logger.info(`Added password: ${JSON.stringify(p)}`);
//     } catch (e) {
//         Logger.error(`Error while adding.`, e);
//     }
// });

// import UserService from '@src/data/user';
// import User from '@src/models/user';
// import Crypto from '@src/utilities/crypto';

// (async () => {
//     try {
//         const user = new User();
//         user.key = Crypto.hash('a pretty good password');
//         user.email = 'chrisharrington99@gmail.com';
//         user.firstName = 'Chris';
//         user.lastName = 'Harrington';
//         await UserService.add(user);
//         console.log('Added user: ' + JSON.stringify(user));
//     } catch (e) {
//         console.error(e);
//     }
// })();