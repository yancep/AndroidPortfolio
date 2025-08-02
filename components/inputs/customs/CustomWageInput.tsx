import { formatNumber } from '@/core/common/utils/utils';
import InfoIcon from '@/public/icons/InfoIcon';
import { Input, Spacer, Tooltip } from "@heroui/react";
import { FormikValues } from 'formik';
import { ChangeEvent, useEffect, useState } from 'react';

export const numberTruncateRegex = /^\d+(?:\.\d{1,2})?$/;

export const CustomWageInput = ({
  form,
  formKey,
  label,
  defaultValue,
  placeholder,
  isRequired,
  maxLength,
  textInfo,
}: {
  form: FormikValues;
  formKey: string;
  label?: string;
  placeholder?: string;
  isRequired: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  defaultValue?: string;
  textInfo?: string;
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const number = formatNumber(form.values[formKey]!);
    setValue(number);

    form.setFieldValue(formKey, number);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const number = formatNumber(value);
    form.handleChange(event);
    form.setFieldValue(formKey, number);
  };

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
        maxLength={maxLength ?? maxLength}
        onBlur={form.handleBlur}
        endContent={<>CUP</>}
        color={
          form.touched[formKey] && form.errors[formKey] ? 'danger' : 'primary'
        }
        errorMessage={
          form.touched[formKey] && form.errors[formKey]
            ? form.errors[formKey]?.toString()
            : ''
        }
        isInvalid={form.touched[formKey] && form.errors[formKey]}
        type={'text'}
        onChange={handleChange}
        value={form.values[formKey]}
        placeholder={placeholder ?? '0.00'}
        defaultValue={value}
      />
    </div>
  );
};
