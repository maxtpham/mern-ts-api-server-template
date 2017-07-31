import * as express from 'express';
import { injectable, inject } from 'inversify';
import { controller, httpGet, requestParam } from 'inversify-express-utils';

import config from './../lib/AppConfig';
import Controller from './../lib/Controller';

@injectable()
@controller('/')
export default class HomeController extends Controller {
  @httpGet('/')
  public get(): string {
    return `<b>Server:</b> ${new Date()}`;
  }
}