import { ValidationErrorMessages } from "@/core/common/validations/errorMessages";
import {
  numberRegex,
  numberTruncateRegex,
  webSiteRegex,
} from "@/core/common/validations/regexs";
import * as Yup from "yup";

export const numberValidation = Yup.string()
  .required(ValidationErrorMessages.required)
  .matches(numberRegex, ValidationErrorMessages.formatIncorrect);

export const numberTruncationValidation = Yup.string()
  .required(ValidationErrorMessages.required)
  .matches(numberTruncateRegex, ValidationErrorMessages.formatIncorrect)
  .test("truncation", "Solo 2 décimas después de la coma", (value) => {
    return value ? (value.match(/\./g) || []).length <= 2 : true;
  });

export const defaultValidation = Yup.string().required(ValidationErrorMessages.required);

export const defaultObjectValidation = Yup.object().required(ValidationErrorMessages.required);

export const defaultArrayValidation = Yup.array()
  .of(Yup.string())
  .min(1, ValidationErrorMessages.required)
  .required(ValidationErrorMessages.required);

export const defaultDateValidation = Yup.date().required(ValidationErrorMessages.required);

export const webSiteValidation = Yup.string()
  .url(ValidationErrorMessages.formatIncorrect)
  .matches(webSiteRegex, ValidationErrorMessages.formatIncorrect);

export const phoneValidation = Yup.string()
  .required(ValidationErrorMessages.required)
  .max(10, ValidationErrorMessages.formatIncorrect);
