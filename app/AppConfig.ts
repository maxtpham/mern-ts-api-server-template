import * as c from "config";

interface IAppConfig extends c.IConfig {
    Port: number;
}

var config: IAppConfig = <IAppConfig>c;
export default config;