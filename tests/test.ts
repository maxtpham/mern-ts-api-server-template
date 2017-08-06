import * as express from 'express';
import { interfaces } from "inversify";
import { AppConfig } from './../src/lib/AppConfig';

export default async function test(app: express.Application, config: AppConfig.IRootConfig, iocContainer: interfaces.Container): Promise<void> {
    console.log('No tests found!');
    return Promise.resolve();
}