/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { componentsProps, RenderAutoCompleteInput, } from '@/components/inputs/autocompletes/utils';
import { DEFAULT_COLOR } from '@/core/theme/app_colors';
import { CheckIcon } from '@heroicons/react/16/solid';
import { Spacer } from "@heroui/react";
import { Paper } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { FormikValues } from 'formik';
import React from 'react';

type AutocompleteInputProps<T> = {
  isLoading: boolean;
  items: T[];
  label: string;
  isRequired: boolean;
  mapItem: (item: T) => React.ReactNode;
  mapItemValue: (item: T) => string;
  mapCompareValue: (option: any, value: any) => boolean;
  mapItemKey: (item: T) => string | number;
  onInputChange: (event: any, value: string) => void;
  onSelectionChange: (event: any, item: T[] | null) => void;
  defaultValue?: T[];
  inputValue: string;
  form: FormikValues;
  formKey: string;
  onClear: () => void;
  placeholder: string;
  textInfo?: string;
};

export function CustomAutocompleteMultipleInput<T>({
  items,
  mapItemValue,
  mapItemKey,
  mapItem,
  form,
  label,
  onInputChange,
  onSelectionChange,
  mapCompareValue,
  isRequired,
  isLoading,
  defaultValue,
  formKey,
  inputValue,
  onClear,
  textInfo,
  placeholder,
}: AutocompleteInputProps<T>) {
  return (
    <div className="flex flex-col">
      {label && (
        <span className="flex flex-row text-small text-foreground opacity-70">
          {label}
          {isRequired && <div className="text-danger">*</div>}
        </span>
      )}
      <Autocomplete
        fullWidth
        multiple
        className={'border-default'}
        size="small"
        defaultValue={defaultValue}
        isOptionEqualToValue={mapCompareValue}
        getOptionLabel={mapItemValue}
        loading={isLoading}
        options={items ?? []}
        inputValue={inputValue ?? ''}
        componentsProps={componentsProps}
        noOptionsText={
          <span className={'text-sm text-opacity-15'}>
            No se encontraron resultados
          </span>
        }
        loadingText={
          <span className={'text-sm text-opacity-15'}>Buscando</span>
        }
        PaperComponent={(props) => (
          <Paper
            sx={{
              color: 'red',
              border: `1px solid ${DEFAULT_COLOR}`,
            }}
            {...props}
          />
        )}
        onChange={onSelectionChange}
        onInputChange={onInputChange}
        autoComplete={true}
        renderOption={(props, option, { selected }) => (
          <li
            {...props}
            className={`mx-2 my-1 flex cursor-pointer flex-row items-center justify-between rounded-lg p-2 text-black hover:bg-default
              ${selected ? 'bg-default' : ''}
            `}
          >
            {mapItem(option as T)}
            {selected && <CheckIcon height={16} width={16} />}
          </li>
        )}
        clearIcon
        style={{
          borderRadius: 10,
        }}
        renderInput={(params) => (
          <RenderAutoCompleteInput
            params={params}
            clearText={onClear}
            form={form}
            formKey={formKey}
            inputValue={inputValue}
            placeholder={placeholder}
            textInfo={textInfo}
            isLoading={isLoading}
            isRequired={isRequired}
          />
        )}
      />
      <Spacer />
      <span className={'text-tiny text-danger'}>
        {form.touched[formKey] && form.errors[formKey]
          ? form.errors[formKey]
          : undefined}
      </span>
    </div>
  );
}
