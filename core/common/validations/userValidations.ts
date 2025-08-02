import { ValidationErrorMessages } from "@/core/common/validations/errorMessages";
import {
  emailRegex,
} from "@/core/common/validations/regexs";
import { usersRepository } from "@/features/users/domain/repositories/UsersRepository";
import * as Yup from "yup";

const checkDuplicate = async (
  field: string,
  value: string
): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const isDuplicateExists = await usersRepository.validateUserField(
        field,
        value
      );
      resolve(isDuplicateExists);
    }, 100);
  });
};

export function usernameValidation() {
  return Yup.string()
    .required(ValidationErrorMessages.required)
    .trim()
    .test(
      "checkUsername",
      ValidationErrorMessages.usernameUnavailable,
      async function (value) {
        return await checkDuplicate("username", value);
      }
    );
}

export function emailUserValidation() {
  return Yup.string()
    .required(ValidationErrorMessages.required)
    .email(ValidationErrorMessages.formatIncorrect)
    .matches(emailRegex, ValidationErrorMessages.formatIncorrect)
    .test(
      "checkEmail",
      ValidationErrorMessages.emailUnavailable,
      async function (value) {
        const isDuplicate = await checkDuplicate("email", value || "");
        return isDuplicate; 
      }
    );
}

export const cubanEmailUserValidation = Yup.string()
  .required(ValidationErrorMessages.required)
  .email(ValidationErrorMessages.formatIncorrect)
  .matches(emailRegex, "El correo electrónico debe terminar en .cu");

export const passwordValidation = Yup.string()
  .required(ValidationErrorMessages.required)
  .min(8, ValidationErrorMessages.passwordMinLength)
  .matches(/[0-9]/, ValidationErrorMessages.passwordNumber)
  .matches(/[a-z]/, ValidationErrorMessages.passwordLowercase)
  .matches(/[A-Z]/, ValidationErrorMessages.passwordUppercase)
  .matches(/[^\w]/, ValidationErrorMessages.passwordSymbol);

export const confirmPasswordValidation = Yup.string()
  .oneOf([Yup.ref("password")], ValidationErrorMessages.confirmPasswordMismatch)
  .required(ValidationErrorMessages.required);
