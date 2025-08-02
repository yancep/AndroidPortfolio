import { Checkbox } from "@heroui/react";
import { FormikValues } from 'formik';
import React from 'react';

interface CustomCheckboxProps {
  form: FormikValues;
  formKey: string;
  label: string;
  isRequired: boolean;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  form,
  formKey,
  label,
  isRequired,
}) => {
  return (
    <div className="flex w-full flex-col">
      <label
        htmlFor={formKey}
        className="flex flex-row text-small text-foreground opacity-70"
      >
        <Checkbox
          id={formKey}
          checked={form.values[formKey]}
          onChange={(e) => {
            form.setFieldValue(formKey, e.target.checked);
          }}
        />
        {label}
        {isRequired && <div className="text-danger">*</div>}
      </label>
    </div>
  );
};

export default CustomCheckbox;
