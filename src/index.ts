import main from './main';
import config from './lib/AppConfig';
import container from './lib/IocContainer';

main(config, container)
.then(app => {
    if (config.Port) {
        if (config.Host)
            app.listen(config.Port, config.Host, () => console.log(`Server started http://${config.Host}${config.Port == 80 ? '' : ':'}${config.Port == 80 ? '' : config.Port}!`));
        else
            app.listen(config.Port, () => console.log(`Server started http://localhost${config.Port == 80 ? '' : ':'}${config.Port == 80 ? '' : config.Port}!`));
    }
    else {
        console.warn(`Running config/${process.env.NODE_ENV}.json without Port number, skip launching the express server`);
        process.exit(0);
    }
})
.catch(e => {
    console.error('[APP] error', e);
    process.exit(1);
});