import { NetWorkDataModuleSymbols } from "@/ioc/common/network.module";
import { applyDependencies } from "@/ioc/utils/applyDependencies";
import { ContainerModule, interfaces } from "inversify";
import { UsersDataModuleSymbols } from "../data/UsersDataModuleSymbols";
import {
  UsersDataSources,
  UsersDataSourcesImpl,
} from "../data/data_sources/UsersDataSources";
import { UserRepositoryImpl } from "../data/repositories/UsersRepositoryImpl";
import { UserRepository } from "./repositories/UsersRepository";

const initializeModule = (bind: interfaces.Bind) => {
  bind<UsersDataSources>(
    UsersDataModuleSymbols.USERS_DATA_SOURCE
  ).toConstantValue(
    applyDependencies(UsersDataSourcesImpl, [
      NetWorkDataModuleSymbols.REST_CLIENT,
    ])
  );

  bind<UserRepository>(UsersDataModuleSymbols.USERS_REPOSITORY).toConstantValue(
    applyDependencies(UserRepositoryImpl, [
      UsersDataModuleSymbols.USERS_DATA_SOURCE,
    ])
  );
};

export const UserModule = new ContainerModule(initializeModule);
