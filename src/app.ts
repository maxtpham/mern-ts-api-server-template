import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as methodOverride from 'method-override';
import 'reflect-metadata';
import { interfaces } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { AppConfig } from './lib/AppConfig';
import registerControllers from "./controllers/index";
import { RegisterRoutes } from './routes';

export async function load(app: express.Application, config: AppConfig.IRootConfig, container: interfaces.Container): Promise<void> {
    return Promise.resolve();
}

export function create(config: AppConfig.IRootConfig, container: interfaces.Container): express.Application {
    // Register IoC
    registerControllers(container);

    // Create the app
    const server = new InversifyExpressServer(container);
    server.setConfig((app) => {
        app.use(bodyparser.urlencoded({ extended: true }));
        app.use(bodyparser.json());
        app.use(methodOverride());
        app.use('/docs', express.static(__dirname + '/swagger-ui'));
        app.use('/swagger.json', (req, res) => {
            res.sendFile(__dirname + '/swagger.json');
        });
        RegisterRoutes(app);
    });
    const app = server.build();
    return app;
}

export function start(app: express.Application, config: AppConfig.IRootConfig, container: interfaces.Container): boolean {
    if (config.Port) {
        if (config.Host)
            app.listen(config.Port, config.Host, () => console.log(`Server started http://${config.Host}${config.Port == 80 ? '' : ':'}${config.Port == 80 ? '' : config.Port}!`));
        else
            app.listen(config.Port, () => console.log(`Server started http://localhost${config.Port == 80 ? '' : ':'}${config.Port == 80 ? '' : config.Port}!`));
    }
    else {
        console.warn(`Running config/${process.env.NODE_ENV}.json without Port number, skip launching the express server`);
        return false;
    }
    return true;
}