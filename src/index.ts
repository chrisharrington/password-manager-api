require('module-alias/register');

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { Db }  from 'mongodb';

import Config from './config';
import Routes from './routes';

import Logger from './logger';

import Connection from './data/connection';
import PasswordService from '@src/data/password';
import Password from '@src/models/password';
const passwords = require('../fixtures/passwords.json');

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

const key = 'this is a very secure key';

// passwords.forEach(async (password, i) => {
//     try {
//         let p = new Password();
//         p.id = i+1;
//         p.domain = password.domain;
//         p.username = password.username;
//         p.password = password.password;
//         await PasswordService.add(p, key);
//         Logger.info(`Added password: ${JSON.stringify(p)}`);
//     } catch (e) {
//         Logger.error(`Error while adding.`, e);
//     }
// });

var crypto = require('crypto');

const blah = 'f56bec7fabb2ef5f';
console.log(decrypt(blah));

function decrypt(text){
    var decipher = crypto.createDecipher('aes-256-ctr', key)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }