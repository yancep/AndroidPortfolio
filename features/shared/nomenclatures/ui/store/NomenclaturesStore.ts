import { formatFilters } from "@/core/api/services/graphQl.service";
import { Query } from "@/core/api/services/url.service";
import { BaseItemNomenclature } from "@/features/shared/nomenclatures/domain/entities/BaseItemNomenclature";
import { NomenclaturesRepository } from "@/features/shared/nomenclatures/domain/repositories/NomenclaturesRepository";
import { ServicesDataModuleSymbols } from "@/features/shared/Services.Module";
import { ApplicationContainer } from "@/ioc/application.container";
import { create } from "zustand";
import { EconomicActivityNomenclatureModel, OrganizationalFormNomenclatureModel } from "../../data/models/NomenclatureModel";
import {
  MunicipalityNomenclature,
  ProvinceNomenclature,
} from "../../domain/entities/LocationNomenclature";
import { OutputsNomenclature } from "../../domain/entities/OutputsNomenclature";
import { TopicsNomenclature } from "../../domain/entities/TopicsNomenclature";

type NomenclaturesStore = {
  scientificDegrees: BaseItemNomenclature[];
  academicDegrees: BaseItemNomenclature[];
  provinces: ProvinceNomenclature[];
  countries: BaseItemNomenclature[];
  administrationBodies: BaseItemNomenclature[];
  topics: TopicsNomenclature[];
  outputs: OutputsNomenclature[];
  organizationalForm: OrganizationalFormNomenclatureModel[];
  economicActivity: EconomicActivityNomenclatureModel[];
  currency: BaseItemNomenclature[];
  expenseElements: BaseItemNomenclature[];
  financingSources: BaseItemNomenclature[];

  getProvinces: (request: Query) => void;
  getCountries: (request: Query) => void;
  getScientificDegrees: () => void;
  getAcademicDegrees: () => void;
  getMunicipalities: (
    url: string
  ) => Promise<MunicipalityNomenclature[] | null | undefined>;
  getTopics: (request: Query) => void;
  getOutputs: (request: Query) => void;
  getOrganizationalForm: (request: Query) => void;
  getEconomicActivity: (request: Query) => void;
  getCurrencies: (request: Query) => void;
  getExpenseElements: (request: Query) => void;
  getFinancingSources: (request: Query) => void;
};

const nomenclaturesRepository = ApplicationContainer.get<NomenclaturesRepository>(
  ServicesDataModuleSymbols.NOMENCLATURES_REPOSITORY
);

export const useNomenclatureStore = create<NomenclaturesStore>()(
  (setState) => ({
    scientificCategory: [],
    educationalCategories: [],
    scientificDegrees: [],
    academicDegrees: [],
    englishLevels: [],
    technologyCategories: [],
    lineOfResearch: [],
    provinces: [],
    administrationBodies: [],
    countries: [],
    topics: [],
    outputs: [],
    organizationalForm: [],
    economicActivity: [],
    currency: [],
    expenseElements: [],
    financingSources: [],

    getScientificDegrees: async () => {
      const response = await nomenclaturesRepository.getScientificDegrees();
      if (response) {
        setState(() => ({ scientificDegrees: response }));
      }
    },
    getAcademicDegrees: async () => {
      const response = await nomenclaturesRepository.getAcademicDegrees();
      if (response) {
        setState(() => ({ academicDegrees: response }));
      }
    },

    getCurrencies: async (request) => {
      const response = await nomenclaturesRepository.getCurrency(request);
      if (response) {
        setState(() => ({ currency: response }));
      }
    },

    getProvinces: async (request) => {
      const response = await nomenclaturesRepository.getProvinces(request);

      if (response) {
        setState(() => ({ provinces: response }));
      }
    },

    getCountries: async (request) => {
      const response = await nomenclaturesRepository.getCountries(request);

      if (response) {
        setState(() => ({ countries: response }));
      }
    },

    getMunicipalities: async (url: string) => {
      const response = await nomenclaturesRepository.getMunicipalities(url);

      if (response) return response;
      else return null;
    },

    getTopics: async (request) => {
      const response = await nomenclaturesRepository.getTopics(request);
      if (response) setState(() => ({ topics: response }));
    },

    getOutputs: async (request) => {
      const response = await nomenclaturesRepository.getOutputs(request);
      if (response) setState(() => ({ outputs: response }));
    },

    getOrganizationalForm: async (request) => {
      const response = await nomenclaturesRepository.getOrganizationalForm(request);
      if (response) setState(() => ({ organizationalForm: response }));
    },

    getEconomicActivity: async (request) => {
      const response = await nomenclaturesRepository.getEconomicActivity(request);
      if (response) setState(() => ({ economicActivity: response }));
    },

    getExpenseElements: async ({ filters = formatFilters({ atomic: true }) }) => {
      const response = await nomenclaturesRepository.getExpenseElements({ filters });
      if (response) setState(() => ({ expenseElements: response }));
    },

    getFinancingSources: async (request) => {
      const response = await nomenclaturesRepository.getFinancingSources(request);
      if (response) setState(() => ({ financingSources: response }));
    },
  })
);
