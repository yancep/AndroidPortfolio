import { Query } from "@/core/api/services/url.service";
import { BaseItemNomenclature } from "@/features/shared/nomenclatures/domain/entities/BaseItemNomenclature";
import { ServicesDataModuleSymbols } from "@/features/shared/Services.Module";
import { ApplicationContainer } from "@/ioc/application.container";
import { EconomicActivityNomenclatureModel, OrganizationalFormNomenclatureModel } from "../../data/models/NomenclatureModel";
import {
  MunicipalityNomenclature,
  ProvinceNomenclature,
} from "../entities/LocationNomenclature";
import { OutputsNomenclature } from "../entities/OutputsNomenclature";
import { TopicsNomenclature } from "../entities/TopicsNomenclature";

export interface NomenclaturesRepository {
  getScientificDegrees: () => Promise<BaseItemNomenclature[]>;
  getAcademicDegrees: () => Promise<BaseItemNomenclature[]>;
  getExpenseElements: (request: Query) => Promise<BaseItemNomenclature[]>;
  getFinancingSources: (request: Query) => Promise<BaseItemNomenclature[]>;
  getProvinces: (request: Query) => Promise<ProvinceNomenclature[]>;
  getCurrency: (request: Query) => Promise<BaseItemNomenclature[]>;
  getMunicipalities: (url: string) => Promise<MunicipalityNomenclature[]>;
  getCountries: (request: Query) => Promise<BaseItemNomenclature[]>; 
  getTopics: (request: Query) => Promise<TopicsNomenclature[]>;
  getOutputs: (request: Query) => Promise<OutputsNomenclature[]>;
  getOrganizationalForm: (request: Query) => Promise<OrganizationalFormNomenclatureModel[]>;
  getEconomicActivity: (request: Query) => Promise<EconomicActivityNomenclatureModel[]>;
}

export const nomenclatureRepository = ApplicationContainer.get<NomenclaturesRepository>(
  ServicesDataModuleSymbols.NOMENCLATURES_REPOSITORY
);
