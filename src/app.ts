import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as methodOverride from 'method-override';
import 'reflect-metadata';
import { interfaces } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { AppConfig } from './lib/AppConfig';
import { RegisterControllers } from './controllers/index';
import { RegisterRoutes } from './routes';
import { RegisterSwaggerUI } from "./lib/SwaggerUI";
import { HomeController } from "./controllers/HomeController";

export async function load(app: express.Application, config: AppConfig.IRootConfig, iocContainer: interfaces.Container): Promise<void> {
    return Promise.resolve();
}

export function create(config: AppConfig.IRootConfig, iocContainer: interfaces.Container): express.Application {
    RegisterControllers(iocContainer);

    // Create the app
    const server = new InversifyExpressServer(iocContainer);
    server.setConfig((app) => {
        app.use(bodyparser.urlencoded({ extended: true }));
        app.use(bodyparser.json());
        app.use(methodOverride());
        RegisterRoutes(app);
        RegisterSwaggerUI(app, '/api', __dirname);
    });
    return server.build();
}

export function start(app: express.Application, config: AppConfig.IRootConfig, iocContainer: interfaces.Container): boolean {
    if (config.Port) {
        if (config.Host)
            app.listen(config.Port, config.Host, () => console.log(`Server started http://${config.Host}${config.Port == 80 ? '' : ':'}${config.Port == 80 ? '' : config.Port}/api!`));
        else
            app.listen(config.Port, () => console.log(`Server started http://localhost${config.Port == 80 ? '' : ':'}${config.Port == 80 ? '' : config.Port}/api!`));
    }
    else {
        console.warn(`Running config/${process.env.NODE_ENV}.json without Port number, skip launching the express server`);
        return false;
    }
    return true;
}