import * as express from 'express';
import * as bodyparser from 'body-parser';
import 'reflect-metadata';
import { interfaces } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { AppConfig } from './lib/AppConfig';
import registerControllers from "./controllers/index";

export default async function main(config: AppConfig.IRootConfig, container: interfaces.Container): Promise<express.Application> {
    await inversifyJs(config, container);
    return await createApp(config, container);
}

async function createApp(config: AppConfig.IRootConfig, container: interfaces.Container): Promise<express.Application> {
    const server = new InversifyExpressServer(container);
    server.setConfig((app) => {
        app.use(bodyparser.urlencoded({
            extended: true
        }));
        app.use(bodyparser.json());
    });
    return Promise.resolve(server.build());
}

async function inversifyJs(config: AppConfig.IRootConfig, container: interfaces.Container): Promise<void> {
    await registerControllers(container);
    return Promise.resolve();
}