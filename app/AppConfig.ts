import { IConfig } from "config";

interface IAppConfig extends IConfig {
    Port: number;
}

var config: IAppConfig = require('config');
export default config;