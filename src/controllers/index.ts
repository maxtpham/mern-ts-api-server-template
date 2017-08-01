import { interfaces } from "inversify";
import { interfaces as interfaces_express, InversifyExpressServer, TYPE } from 'inversify-express-utils';

import HomeController from "./HomeController";

export default function registerControllers(container: interfaces.Container): void {
    container.bind<interfaces_express.Controller>(TYPE.Controller).to(HomeController).whenTargetNamed(HomeController.name);
}