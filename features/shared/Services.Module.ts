import {
  NomenclaturesRepositoryImpl
} from '@/features/shared/nomenclatures/data/repositories/NomenclaturesRepositoryImpl';
import {
  NomenclaturesRepository
} from '@/features/shared/nomenclatures/domain/repositories/NomenclaturesRepository';
import { NetWorkDataModuleSymbols } from '@/ioc/common/network.module';
import { applyDependencies } from '@/ioc/utils/applyDependencies';
import { ContainerModule, interfaces } from 'inversify';
import {
  NomenclaturesDataSources,
  NomenclaturesDataSourcesImpl,
} from './nomenclatures/data/data_sources/NomenclaturesDataSources';

/**
 * @description Symbols for the shared data module.
 */
export const ServicesDataModuleSymbols = {
  NOMENCLATURES_DATA_SOURCES : Symbol( 'NomenclaturesDataSourcesImpl' ),
  NOMENCLATURES_REPOSITORY : Symbol( 'NomenclaturesRepositoryImpl' ),
};

const initializeModule = ( bind : interfaces.Bind ) => {
  bind<NomenclaturesDataSources>(
	ServicesDataModuleSymbols.NOMENCLATURES_DATA_SOURCES,
  ).toConstantValue(
	applyDependencies( NomenclaturesDataSourcesImpl, [
	  NetWorkDataModuleSymbols.REST_CLIENT,
	] ),
  );
  
  bind<NomenclaturesRepository>(
	ServicesDataModuleSymbols.NOMENCLATURES_REPOSITORY,
  ).toConstantValue(
	applyDependencies( NomenclaturesRepositoryImpl, [
	  ServicesDataModuleSymbols.NOMENCLATURES_DATA_SOURCES,
	] ),
  );
  
};

export const ServicesModule = new ContainerModule( initializeModule );
