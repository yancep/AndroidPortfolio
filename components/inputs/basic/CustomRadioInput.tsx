import { cn, RadioGroup, Spacer, useRadio, VisuallyHidden, } from "@heroui/react";
import { FormikValues } from 'formik';
import React from 'react';

/**
 * CustomRadio Component
 * @param {object} props - Props del componente
 * @param {React.ReactNode} props.children - Contenido del radio
 * @param {string} props.descripcion - Descripción del radio
 * @returns {JSX.Element} Componente CustomRadio
 */
const CustomRadio = (props: any) => {
  const {
    Component,
    children,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        'group inline-flex flex-row-reverse items-center justify-start tap-highlight-transparent hover:opacity-70 active:opacity-50',
        'w-full cursor-pointer rounded-small p-2',
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()} className='flex flex-col gap-1 ml-2'>
        {children && <span {...getLabelProps()} >{children}</span>}
        {description && (
          <span className="text-small text-foreground opacity-70">
            {description}
          </span>
        )}
      </div>
    </Component>
  );
};

interface CustomRadioInputProps {
  form: FormikValues;
  label: string;
  formKey: string;
  radios: { value: string; label: string }[]; // Lista de radios con valores y etiquetas
}

const CustomRadioInput: React.FC<CustomRadioInputProps> = ({
  form: formik,
  label,
  formKey: formKey,
  radios,
}) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-row text-small text-foreground opacity-70">
        {label}
        <span className="text-danger">*</span>
      </div>
      <RadioGroup
        id={formKey} // Utiliza el formKey proporcionado como ID del RadioGroup
        color={formik.errors[formKey] ? 'danger' : 'primary'}
        size="sm"
        defaultValue={formik.values[formKey]}
        value={formik.values[formKey]}
        onChange={(e: any) => {
          formik.handleChange(e);
          formik.setFieldValue(formKey, e.target.value);
        }}
        isInvalid={formik.touched[formKey] && formik.errors[formKey]}
        onBlur={formik.handleBlur}
        errorMessage={
          formik.touched[formKey] && formik.errors[formKey]
            ? formik.errors[formKey]
            : null
        }
      >
        <div className="flex w-full flex-row justify-between ">
          {radios.map((radio, index) => (
            <React.Fragment key={index}>
              <CustomRadio value={radio.value}>{radio.label}</CustomRadio>
              {index !== radios.length - 1 && <Spacer />}
            </React.Fragment>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default CustomRadioInput;
