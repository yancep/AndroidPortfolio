import { Spacer, Textarea, Tooltip } from "@heroui/react";
import { FormikValues } from 'formik';
import { ReactNode, useMemo, useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';

/**
 * Props para el componente CustomTextArea.
 */

interface CustomTextAreaProps {
  form: FormikValues; // Valores del formulario Formik
  formKey: string; // Clave del campo en los valores del formulario
  label: string; // Etiqueta para el textarea
  placeholder?: string; // Texto de marcador de posición para el textarea
  isRequired: boolean; // Indica si el textarea es obligatorio
  autoFocus?: boolean; // Indica si el textarea debe tener el foco automáticamente
  minRows?: number; // Número de filas del textarea
  maxLength?: number; // Longitud máxima del textarea
  textInfo?: string;
  iconInfo?: ReactNode;
}

/**
 * @description Componente CustomTextArea para renderizar un textarea estilizado con integración Formik.
 * @param {CustomTextAreaProps} props - Props para el componente CustomTextArea.
 * @returns {JSX.Element} Componente de textarea con estilo personalizado e integración Formik.
 */

const CustomTextArea = ({
  form,
  formKey,
  label,
  placeholder,
  isRequired,
  autoFocus,
  minRows,
  maxLength,
  textInfo,
}: CustomTextAreaProps) => {
  const [max, setMax] = useState<number>();

  const wordsCount = useMemo(() => {
    if (form.values[formKey] !== undefined && maxLength) {
      const words = form.values[formKey].split(' ');
      // Calcular el espacio restante
      const wordsRemaining = maxLength - words.length;

      if (words.length === maxLength) {
        setMax(form.values[formKey].length);
      } else {
        setMax(undefined);
      }

      return { wordsRemaining };
    }
    return { wordsRemaining: undefined, charactersRemaining: undefined };
  }, [form.values[formKey]]);

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-row items-center justify-between text-small text-foreground opacity-70">
        <div className={'flex flex-row items-center'}>
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
                <BsInfoCircle />
              </div>
            </Tooltip>
          )}
        </div>
        {maxLength && (
          <span className="text-foreground opacity-60">
            Palabras restantes:
            {wordsCount.wordsRemaining}
          </span>
        )}
      </div>
      <Textarea
        onFocus={() => form.setFieldTouched(formKey)}
        minRows={minRows}
        maxLength={max}
        radius={'sm'}
        autoFocus={autoFocus}
        id={formKey}
        variant="bordered"
        size="sm"
        onBlur={form.handleBlur}
        color={
          form.touched[formKey] && form.errors[formKey] ? 'danger' : 'primary'
        }
        isInvalid={form.touched[formKey] && form.errors[formKey]}
        errorMessage={
          form.touched[formKey] && form.errors[formKey]
            ? form.errors[formKey]?.toString()
            : undefined
        }
        onChange={(e) => {
          form.setFieldTouched(formKey);
          form.handleChange(e);
          form.setFieldValue(formKey, e.target.value);
        }}
        value={form.values[formKey]}
        placeholder={placeholder ?? ''}
      />
    </div>
  );
};

export default CustomTextArea;
