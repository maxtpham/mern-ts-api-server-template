import * as app from './../src/app';
import config from './../src/lib/AppConfig';
import { iocContainer } from './../src/lib/IocContainer';
import test from './test';

export const application = app.create(config, iocContainer);
app.load(application, config, iocContainer)
.then(async () => {
    await test(application, config, iocContainer);
    console.log('[TEST] Done!');
    process.exit(0);
})
.catch(e => {
    console.error('[TEST] Error', e);
    process.exit(1);
});