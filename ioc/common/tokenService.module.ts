import {
  TokenService,
  TokenServiceImpl,
  TokenServiceSymbols,
} from '@/core/services/token/token.service';
import { applyDependencies } from '@/ioc/utils/applyDependencies';
import { ContainerModule, interfaces } from 'inversify';

const initializeTokenServiceModule = (bind: interfaces.Bind) => {
  bind<TokenService>(TokenServiceSymbols.TOKEN_SERVICE).toConstantValue(
    applyDependencies(TokenServiceImpl),
  );
};

export const TokenServiceModule = new ContainerModule(
  initializeTokenServiceModule,
);
