 
 
import { Entity } from '@/features/entities/domain/entities/Entity';
import { FormikValues } from 'formik';
import React from 'react';

export type InputType =
  | 'text'
  | 'number'
  | 'search'
  | 'url'
  | 'tel'
  | 'email'
  | 'password'
  | 'date';

export interface FieldState<T> {
  selectedKey: React.Key | undefined;
  selectedItem: T | undefined;
  inputValue: string | undefined;
  items: T[] | undefined;
}

export interface SearchInputsProps<T> {
  defaultValue?: {
    key: React.Key | null;
    value: string | null;
  };
  form: FormikValues;
  formKey?: string;
  id?: string;
  isFilter?: boolean;
  isRequired?: boolean;
  label?: string;
  mapItem?: (item: T) => React.ReactNode;
  mapItemKey?: (item: T) => string | number;
  mapItemValue?: (item: T) => string;
  onInputChange?: (value: string) => void;
  onSelectionChange?: (state: FieldState<T>) => void;
  url?: string;

  // For person Search
  entityInstance?: Entity | null | undefined;
}
