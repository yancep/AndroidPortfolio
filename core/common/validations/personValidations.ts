import { ValidationErrorMessages } from "@/core/common/validations/errorMessages";
import * as Yup from "yup";

// Función para verificar duplicados
export const nameAndLastNameValidation = Yup.string()
  .required(ValidationErrorMessages.required)
  .matches(
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+([ '-][a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/,
    ValidationErrorMessages.formatIncorrect
  );
