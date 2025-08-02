import { DatePicker, Spacer, Tooltip } from "@heroui/react";
import React, { useState, useEffect } from "react";
import InfoIcon from "@/public/icons/InfoIcon";
import { FormikValues } from "formik";
import { CalendarDate, parseDate, today, getLocalTimeZone } from "@internationalized/date";

const CustomDatePicker = ({
  form,
  formKey,
  label,
  isRequired,
  defaultValue,
  isDisable = false,
  textInfo,
  nextYear = false,
}: {
  form: FormikValues;
  formKey: string;
  label?: string;
  placeholder?: string;
  isRequired: boolean;
  defaultValue?: string;
  isDisable?: boolean;
  textInfo?: string;
  nextYear?: boolean; 
}) => {
  let minDate: CalendarDate | undefined;
  let maxDate: CalendarDate | undefined;
  
  if (nextYear) {
    const currentYear = today(getLocalTimeZone()).year;
    const nextYearValue = currentYear;
    minDate = new CalendarDate(nextYearValue, 1, 1);
    maxDate = new CalendarDate(nextYearValue, 12, 31);
  }

  const initialDate =
    defaultValue && /^\d{4}-\d{2}-\d{2}$/.test(defaultValue)
      ? parseDate(defaultValue)
      : undefined;

  const [value, setValue] = useState<CalendarDate | undefined | null>(
    form.values[formKey] ? parseDate(form.values[formKey]) : initialDate
  );

  useEffect(() => {
    if (nextYear && value) {
      const currentYear = today(getLocalTimeZone()).year;
      const nextYearValue = currentYear;
      
      if (value.year !== nextYearValue) {
        const correctedDate = new CalendarDate(
          nextYearValue,
          Math.min(Math.max(value.month, 1), 12),
          Math.min(Math.max(value.day, 1), 31)
        );
        setValue(correctedDate);
        form.setFieldValue(formKey, correctedDate.toString());
      }
    }
  }, [value, nextYear, form, formKey]);

  function onChange(newValue: CalendarDate | null) {
    if (!newValue) {
      setValue(null);
      form.setFieldValue(formKey, "");
      return;
    }

    if (nextYear) {
      const currentYear = today(getLocalTimeZone()).year;
      const nextYearValue = currentYear + 1;
      
      const correctedDate = new CalendarDate(
        nextYearValue,
        Math.min(Math.max(newValue.month, 1), 12),
        Math.min(Math.max(newValue.day, 1), 31)
      );
      
      setValue(correctedDate);
      form.setFieldValue(formKey, correctedDate.toString());
    } else {
      setValue(newValue);
      form.setFieldValue(formKey, newValue.toString());
    }
  }

  return (
    <DatePicker
      label={
        <div className="flex space-x-1 flex-row items-center text-small text-foreground opacity-70">
          <span>{label}</span>
          {isRequired && <span className="text-danger">*</span>}
          <Spacer />
          {textInfo && (
            <Tooltip
              classNames={{ content: "w-[300px] p-2 text-justify" }}
              content={textInfo}
              placement={"right"}
            >
              <div>
                <InfoIcon />
              </div>
            </Tooltip>
          )}
        </div>
      }
      labelPlacement={"outside"}
      showMonthAndYearPickers
      onFocus={() => form.setFieldTouched(formKey)}
      id={formKey}
      isDisabled={isDisable}
      variant="bordered"
      size="md"
      radius={"sm"}
      onBlur={form.handleBlur}
      color={form.touched[formKey] && form.errors[formKey] ? "danger" : "primary"}
      isInvalid={!!(form.touched[formKey] && form.errors[formKey])}
      errorMessage={
        form.touched[formKey] && form.errors[formKey]
          ? form.errors[formKey]?.toString()
          : undefined
      }
      value={value}
      onChange={onChange}
      minValue={nextYear ? minDate : undefined} 
      maxValue={nextYear ? maxDate : undefined} 
    />
  );
};

export default CustomDatePicker;