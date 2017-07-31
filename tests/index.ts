import main from './../src/main';
import config from './../src/lib/AppConfig';
import container from './../src/lib/IocContainer';
import test from './test';

main(config, container)
.then(async app => {
    await test(app, container);
    console.log('[TEST] Done!');
    process.exit(0);
})
.catch(e => {
    console.error('[TEST] Error', e);
    process.exit(1);
});
