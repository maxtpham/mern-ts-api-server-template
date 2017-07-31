import * as express from 'express';
import { interfaces } from "inversify";

export default async function test(app: express.Application, container: interfaces.Container): Promise<void> {
    console.log('No tests found!');
    return Promise.resolve();
}