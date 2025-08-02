import { Query } from "@/core/api/services/url.service";
import { ProvinceNomenclature } from '@/features/shared/nomenclatures/domain/entities/LocationNomenclature';
import { NomenclaturesRepository } from "@/features/shared/nomenclatures/domain/repositories/NomenclaturesRepository";
import { ServicesDataModuleSymbols } from "@/features/shared/Services.Module";
import { ApplicationContainer } from '@/ioc/application.container';
import { useCallback, useState } from 'react';

const nomenclaturesRepository = ApplicationContainer.get<NomenclaturesRepository>(
  ServicesDataModuleSymbols.NOMENCLATURES_REPOSITORY
);

export const useProvinces = () => {
  const [provinces, setProvinces] = useState<ProvinceNomenclature[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProvinces = useCallback(async (request: Query) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await nomenclaturesRepository.getProvinces(request);
      
      if (response) {
        setProvinces(response);
      } else {
        setError('No se pudieron obtener las provincias');
        setProvinces([]);
      }
    } catch (err) {
      setError('Error inesperado al obtener provincias');
      setProvinces([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    provinces,
    isLoading,
    error,
    getProvinces,
  };
};