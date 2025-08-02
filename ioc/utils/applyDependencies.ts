import { ApplicationContainer } from '@/ioc/application.container';
import { interfaces } from 'inversify';

export const applyDependencies = (
  func: Function,
  dependencies: interfaces.ServiceIdentifier<unknown>[] = [],
) => {
  const injections = dependencies.map((dependency) =>
    ApplicationContainer.get(dependency),
  );
  return func.apply(func, injections);
};
