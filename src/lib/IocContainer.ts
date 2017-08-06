import { Container, interfaces } from 'inversify';
import { makeFluentProvideDecorator } from 'inversify-binding-decorators';

export const iocContainer: interfaces.Container = <interfaces.Container>new Container();
 
const fluentProvider = makeFluentProvideDecorator(iocContainer);

export const injectableNamed = function(
  identifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>,
  name: string
) {
    return fluentProvider(identifier)
      .whenTargetNamed(name)
      .done();
};

export const injectableSingleton = function(
  identifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>
) {
    return fluentProvider(identifier)
      .inSingletonScope()
      .done();
};