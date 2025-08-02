import { ApplicationContainer } from '@/ioc/application.container';

export const injector = <T>(symbol: symbol) => {
  return ApplicationContainer.get<T>(symbol);
};
