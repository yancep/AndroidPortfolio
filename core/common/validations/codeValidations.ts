import { programRepository } from "@/features/programs/domain/repositories/ProgramRepository";
import { Either, isLeft, isRight } from "fp-ts/Either";
import * as Yup from "yup";
import { ValidationErrorMessages } from "./errorMessages";

export const mapCodeErrorsToSpanish = (error: string): string => {
  const errorMappings: Record<string, string> = {
    "The code must begin with the Program type: PN (National Program), PS (Sector Program) or PT (Territorial Program)":
      "El código debe comenzar con el tipo de programa: PN (Programa Nacional), PS (Programa Sectorial) o PT (Programa Territorial)",
    "After the Program type must be equal to the duine code of the managing entity":
      "Después del tipo de programa debe ir el código duine de la entidad gestora",
    "The duine code of the managing entity must be followed by the code of the province of the executing entity":
      "El código duine de la entidad gestora debe ir seguido del código de la provincia de la entidad ejecutora",
    "After the code of the province of the executing agency must be the consecutive code assigned to the programs by agency or by entity":
      "Después del código de provincia de la entidad ejecutora debe ir el código consecutivo asignado a los programas por agencia o entidad",
    "The number assigned to the program by the entity must be only numbers":
      "El número asignado al programa por la entidad debe contener solo dígitos",
    "The code already exists":
      "Ya existe un programa con ese código",
    "Ya existe Program con este code.":
     "Ya existe un programa con ese código",
    "Please fill out this field.":
     "Toque fuera del input"
  };

  return errorMappings[error] || error;
};

export const programCodeValidation = Yup.string()
  .required(ValidationErrorMessages.required)
  .test("codeValidation", async function (value) {
    if (!value) return false;
    const result: Either<string, { code: string[] }> =
      await programRepository.validateCodeProgram(value);

    if (isLeft(result)) {
      if (this.parent._errors?.codeValidation) {
        delete this.parent._errors.codeValidation;
      }
      return this.createError({ message: mapCodeErrorsToSpanish(result.left) });
    }

    if (isRight(result)) {
      if (this.parent._errors?.codeValidation) {
        delete this.parent._errors.codeValidation;
      }
      return true;
    }

    return false;
  })
  .transform((value) => value?.trim());
