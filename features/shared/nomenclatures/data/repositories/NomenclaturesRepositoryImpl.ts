import { ErrorData } from "@/core/api/errors/HandleResponse";
import { Query } from "@/core/api/services/url.service";
import { NomenclaturesRepository } from "@/features/shared/nomenclatures/domain/repositories/NomenclaturesRepository";
import { NomenclaturesDataSources } from "../data_sources/NomenclaturesDataSources";
import {
  mapEconomicActivity,
  mapExpense,
  mapMunicipalityNomenclatureModelToMunicipalityNomenclature,
  mapOutputsNomenclatureModelToOutputsNomenclature,
  mapProvinceNomenclatureModelToProvinceNomenclature,
  mapTopicsNomenclatureModelToTopicsNomenclature,
} from "../mappers/NomeclatureMapper";

export const NomenclaturesRepositoryImpl = (
  nomenclaturesDataSources: NomenclaturesDataSources
): NomenclaturesRepository => ({
  getScientificDegrees: async () => {
    try {
      return await nomenclaturesDataSources.getScientificDegrees();
    } catch (error) {
      throw ErrorData("Ha ocurrido un error de conexión");
    }
  },

  getCurrency: async () => {
    try {
      return await nomenclaturesDataSources.getCurrency();
    } catch (error) {
      throw ErrorData("Ha ocurrido un error de conexión");
    }
  },

  getExpenseElements: async (query) => {
    try {
      return await nomenclaturesDataSources.getExpenseElements(query);
    } catch (error) {
      throw ErrorData("Ha ocurrido un error de conexión");
    }
  },

  getAcademicDegrees: async () => {
    try {
      return await nomenclaturesDataSources.getAcademicDegrees();
    } catch (error) {
      throw ErrorData("Ha ocurrido un error de conexión");
    }
  },

  getProvinces: async ({
    limit,
    search,
    fields = "url name municipalities{ * }",
  }) => {
    try {
      const response = await nomenclaturesDataSources.getProvinces({
        limit,
        search,
        fields,
      });
      return response.map((province) =>
        mapProvinceNomenclatureModelToProvinceNomenclature(province)
      );
    } catch (error) {
      throw ErrorData("Ha ocurrido un error de conexión");
    }
  },

  getCountries: async ({limit, page, search, fields = `url name`}: Query) => {
    try {
      let response = await nomenclaturesDataSources.getCountries({limit, page, search, fields});
      response = response.map((item => {item.id = extractFinalIdFromUrl(item.url)!.toString();
        return item;
      }))
      return response;
    } catch (error) {
      throw ErrorData("Ha ocurrido un error de conexión");
    }
  },

  getMunicipalities: async (url: string) => {
    try {
      const response = await nomenclaturesDataSources.getMunicipalities(url);
      return response.map((municipality) =>
        mapMunicipalityNomenclatureModelToMunicipalityNomenclature(municipality)
      );
    } catch (error) {
      throw ErrorData("Ha ocurrido un error de conexión");
    }
  },
  getTopics: async ({ limit, search }) => {
    try {
      const response = await nomenclaturesDataSources.getTopics({
        limit,
        search,
      });
      return response.map((topic) =>
        mapTopicsNomenclatureModelToTopicsNomenclature(topic)
      );
    } catch (error) {
      throw ErrorData("Ha ocurrido un error de conexión");
    }
  },
  getOutputs: async ({ limit, search }) => {
    try {
      const response = await nomenclaturesDataSources.getOutputs({
        limit,
        search,
      });
      return response.map((output) =>
        mapOutputsNomenclatureModelToOutputsNomenclature(output)
      );
    } catch (error) {
      throw ErrorData("Ha ocurrido un error de conexión");
    }
  },
  getOrganizationalForm: async ({ limit, search }) => {
    try {
      const response = await nomenclaturesDataSources.getOrganizationalForm({
        limit,
        search,
      });
      return response.map((item: any) => mapExpense(item));
    } catch (error) {
      throw ErrorData("Ha ocurrido un error de conexión");
    }
  },

  getFinancingSources: async ({ limit, search }) => {
    try {
      const response = await nomenclaturesDataSources.getFinancingSources({
        limit,
        search,
      });
      return response;
    } catch (error) {
      throw ErrorData("Ha ocurrido un error de conexión");
    }
  },

  getEconomicActivity: async ({ limit, search }) => {
    try {
      const response = await nomenclaturesDataSources.getEconomicActivity({
        limit,
        search,
      });
      return response.map((item: any) => mapEconomicActivity(item));
    } catch (error) {
      throw ErrorData("Ha ocurrido un error de conexión");
    }
  },
});

export function extractFinalIdFromUrl(url: string): number | null {
  const cleanedUrl = url.replace(/\/+$/, "");
  const lastSegment = cleanedUrl.split("/").pop();
  const id = Number(lastSegment);
  return isNaN(id) ? null : id;
}
