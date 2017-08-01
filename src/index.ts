import * as app from './app';
import config from './lib/AppConfig';
import container from './lib/IocContainer';

export const application = app.create(config, container);
app.load(application, config, container)
.then(() => {
    if (!app.start(application, config, container))
        process.exit(0);
})
.catch(e => {
    console.error('[APP] error', e);
    process.exit(1);
});