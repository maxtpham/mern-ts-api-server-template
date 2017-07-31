import { interfaces } from "inversify";
import { interfaces as interfaces_express, InversifyExpressServer, TYPE } from 'inversify-express-utils';

import HomeController from "./HomeController";

export default async function registerControllers(container: interfaces.Container): Promise<void> {
    container.bind<interfaces_express.Controller>(TYPE.Controller).to(HomeController).whenTargetNamed(HomeController.name);
    return Promise.resolve();
}