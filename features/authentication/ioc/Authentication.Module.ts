import { IUseCase } from "@/core/interfaces/IUseCase";
import { TokenServiceSymbols } from "@/core/services/token/token.service";
import { AuthenticationRepositoryImpl } from "@/features/authentication/data/repositories/AuthenticationRepositoryImpl";
import { AuthenticationRepository } from "@/features/authentication/domain/repositories/AuthenticationRepository";
import { NetWorkDataModuleSymbols } from "@/ioc/common/network.module";
import { applyDependencies } from "@/ioc/utils/applyDependencies";
import { ContainerModule, interfaces } from "inversify";
import {
  AuthenticationDataSources,
  AuthenticationDataSourcesImpl,
} from "../data/data_sources/AuthenticationDataSources";
import {
  loginUseCase,
  loginUseCaseRequest,
  loginUseCaseResponse,
} from "../domain/useCases/loginUseCase";
import { logoutUseCase, logoutUseCaseResponse } from "../domain/useCases/logoutUseCase";
import { AuthenticationServicesSymbols } from "./AuthenticationServiceSymbols";

const initializeModule = (bind: interfaces.Bind) => {
  bind<AuthenticationDataSources>(
    AuthenticationServicesSymbols.dataSources.AUTHENTICATION_DATA_SOURCES
  ).toConstantValue(
    applyDependencies(AuthenticationDataSourcesImpl, [NetWorkDataModuleSymbols.REST_CLIENT])
  );

  bind<AuthenticationRepository>(
    AuthenticationServicesSymbols.repositories.AUTHENTICATION_REPOSITORY
  ).toConstantValue(
    applyDependencies(AuthenticationRepositoryImpl, [
      AuthenticationServicesSymbols.dataSources.AUTHENTICATION_DATA_SOURCES,
      TokenServiceSymbols.TOKEN_SERVICE,
    ])
  );

  bind<IUseCase<loginUseCaseRequest, Promise<loginUseCaseResponse>>>(
    AuthenticationServicesSymbols.useCases.LOGIN_USE_CASE
  ).toConstantValue(
    applyDependencies(loginUseCase, [
      AuthenticationServicesSymbols.repositories.AUTHENTICATION_REPOSITORY,
    ])
  );

  bind<IUseCase<void, Promise<logoutUseCaseResponse>>>(
    AuthenticationServicesSymbols.useCases.LOGOUT_USE_CASE
  ).toConstantValue(
    applyDependencies(logoutUseCase, [
      AuthenticationServicesSymbols.repositories.AUTHENTICATION_REPOSITORY,
    ])
  );
};

export const AuthenticationModule = new ContainerModule(initializeModule);
