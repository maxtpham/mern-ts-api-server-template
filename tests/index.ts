import * as app from './../src/app';
import config from './../src/lib/AppConfig';
import container from './../src/lib/IocContainer';
import test from './test';

export const application = app.create(config, container);
app.load(application, config, container)
.then(async () => {
    await test(application, config, container);
    console.log('[TEST] Done!');
    process.exit(0);
})
.catch(e => {
    console.error('[TEST] Error', e);
    process.exit(1);
});