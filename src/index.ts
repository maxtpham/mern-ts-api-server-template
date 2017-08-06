import * as app from './app';
import config from './lib/AppConfig';
import { iocContainer } from './lib/IocContainer';

export const application = app.create(config, iocContainer);
app.load(application, config, iocContainer)
.then(() => {
    if (!app.start(application, config, iocContainer))
        process.exit(0);
})
.catch(e => {
    console.error('[APP] error', e);
    process.exit(1);
});