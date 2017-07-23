import * as express from 'express';
import config from './config/AppConfig';
import "reflect-metadata";
import { Container, inject, injectable } from 'inversify';
import * as mongoclient from './lib/MongoClient';

(async () => {
    const container = new Container();
    container.bind<mongoclient.MongoClient>(mongoclient.TYPES.MongoClient).toConstantValue(
        process.env.NODE_ENV === 'test' ? await mongoclient.createMockgoClient(config.MongoDB) : await mongoclient.createMongoClient(config.MongoDB)
    );

    if (config.Port) {
        // only create the ExpressJS app if config.Port available
        const app = express();
        app.get('/', (req, res) => { res.send(`<b>Time:</b> ${new Date()}`); });
        app.listen(config.Port, () => console.log(`Server listening on port ${config.Port}!`));
    } else {
        console.warn(`Running config/${process.env.NODE_ENV}.json without Port number, skip launching the express server`);
    }

    if (process.env.NODE_ENV === 'test') {
        console.log('[UNIT-TEST] is loading..');
        console.log('[UNIT-TEST] DONE!');
    }
})();