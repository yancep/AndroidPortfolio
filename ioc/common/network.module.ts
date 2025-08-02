import RestClient from '@/core/api/common/config/rest.client';
import {
  TokenServiceImpl,
  TokenServiceSymbols,
} from '@/core/services/token/token.service';
import { AxiosInstance } from 'axios';
import { ContainerModule, interfaces } from 'inversify';
import { applyDependencies } from '../utils/applyDependencies';

export const NetWorkDataModuleSymbols = {
  REST_CLIENT: Symbol('RestClient'),
};

const initializeNetworkModule = (bind: interfaces.Bind) => {
  bind<AxiosInstance>(NetWorkDataModuleSymbols.REST_CLIENT).toConstantValue(
    RestClient(
      applyDependencies(TokenServiceImpl, [TokenServiceSymbols.TOKEN_SERVICE]),
    ),
  );
};

export const NetworkModule = new ContainerModule(initializeNetworkModule);
