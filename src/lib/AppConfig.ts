import * as c from "config";

export module AppConfig {
    export interface IRootConfig extends c.IConfig {
        Host?: string;
        Port?: number;
        MongoDB?: string;
    }
}

var config: AppConfig.IRootConfig = <AppConfig.IRootConfig>c;
console.log(`[CONFIG] Running config/${config.util.getEnv('NODE_ENV')}.json`, config);
export default config;