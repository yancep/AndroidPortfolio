import { Input, Spacer, Tooltip } from "@heroui/react";
import React from 'react';
import InfoIcon from '@/public/icons/InfoIcon';
import { FormikValues } from 'formik';

export const CustomNumberInput = ({
  form,
  formKey,
  label,
  placeholder,
  isRequired,
  maxLength,
  textInfo,
  endContent,
  startContent,
}: {
  form: FormikValues;
  formKey: string;
  label?: string;
  placeholder?: string;
  isRequired: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  textInfo?: string;
  startContent?: React.ReactNode | null;
  endContent?: React.ReactNode | null;
}) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-row items-center text-small text-foreground opacity-70">
        <span>{label}</span>
        {isRequired && <span className="text-danger">*</span>}
        <Spacer />
        {textInfo && (
          <Tooltip
            classNames={{
              content: 'w-[300px] p-2 text-justify',
            }}
            content={textInfo}
            placement={'right'}
          >
            <div>
              <InfoIcon />
            </div>
          </Tooltip>
        )}
      </div>
      <Input
        id={formKey}
        onFocus={() => form.setFieldTouched(formKey)}
        variant="bordered"
        required={isRequired}
        size="md"
        maxLength={maxLength}
        onBlur={form.handleBlur}
        endContent={endContent}
        startContent={startContent}
        color={
          form.touched[formKey] && form.errors[formKey] ? 'danger' : 'primary'
        }
        errorMessage={
          form.touched[formKey] && form.errors[formKey]
            ? form.errors[formKey]
            : ''
        }
        isInvalid={form.touched[formKey] && form.errors[formKey]}
        type={'number'}
        onChange={(event) => {
          event.preventDefault();
          form.handleChange(event);
          form.setFieldValue(formKey, event.target.value);
        }}
        value={form.values[formKey]}
        placeholder={placeholder ?? '0'}
        defaultValue={form.values[formKey]}
      />
    </div>
  );
};
