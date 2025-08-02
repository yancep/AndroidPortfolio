import { ProjectRepository } from "@/features/acti/domain/repositories/ProjectsRepository";
import { isLeft, isRight } from "fp-ts/lib/Either";
import * as Yup from "yup";
import { ValidationErrorMessages } from "./errorMessages";

const mapProjectsErrors = (error: string): string => {
  const provinceCodeMatch = error.match(
    /The code ([A-Z0-9]+) does not belong to any province/
  );
  const entityCodeMatch = error.match(
    /The code ([0-9]+) does not belong to any entity/
  );
  const prefixMatch = error.match(/The prefix ([A-Z]+) is not valid/);

  const provinceCode = provinceCodeMatch ? provinceCodeMatch[1] : null;
  const entityCode = entityCodeMatch ? entityCodeMatch[1] : null;
  const prefix = prefixMatch ? prefixMatch[1] : null;

  if (provinceCode) {
    return `El código ${provinceCode} no pertenece a ninguna provincia. Introduzca un código válido.`;
  }

  if (entityCode) {
    return `El código ${entityCode} no pertenece a ninguna entidad. Introduzca un código válido.`;
  }

  if (prefix) {
    return `El prefijo ${prefix} no es válido. Debe ser uno de estos: PS, PT, NA, PN.`;
  }

  // Mapeo de errores específicos
  const errorMappings: Record<string, string> = {
    "Incorrect code format. The code should be in this format (ZZ###ZZ###-###).":
      "El código tiene un formato incorrecto. Use el formato (ZZ###ZZ###-###) con letras mayúsculas y números. Por ejemplo: PS123NA456-789.",
    "Ya existe Proyecto con este code.":
      "Ya existe un proyecto registrado con este código.",
    "Ya existe Proyecto con este title.":
      "Ya existe un proyecto registrado con este título.",
    "The code must begin with the Program type: PN (National Program), PS (Sector Program), PT (Territorial Program) or NA(Not associated with program)":
      "El código debe comenzar con el tipo de programa: PN (Programa Nacional), PS (Programa Sectorial), PT (Programa Territorial) o NA (No asociado a programa).",
    "After the Program type must be equal to the duine code of the managing entity":
      "Después del tipo de programa debe ir el código DUINE de la entidad gestora.",
    "The duine code of the managing entity must be followed by the code of the province of the executing entity":
      "El código DUINE de la entidad gestora debe ir seguido del código de la provincia de la entidad ejecutora.",
    "After the code of the province of the executing agency must be the consecutive code assigned to the programs by agency or by entity":
      "Después del código de provincia de la entidad ejecutora debe ir el código consecutivo asignado a los programas por agencia o entidad.",
    "After the program number, there must be the consecutive code assigned to the projects by agency or entity.":
      "Después del número de programa debe ir el código consecutivo asignado a los proyectos por agencia o entidad."
  };

  return errorMappings[error] || error;
};

export const projectCodeValidation = Yup.string()
  .required(ValidationErrorMessages.required)
  .test("codeValidation", async function (value) {
    if (!value) return false;
    const result = await ProjectRepository.validateProjectFields({
      code: value
    });
    
    if (isLeft(result)) {
      if (this.parent._errors?.codeValidation) {
        delete this.parent._errors.codeValidation;
      }
      return this.createError({ message: mapProjectsErrors(result.left) });
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

export const projectTitleValidation = Yup.string()
  .required(ValidationErrorMessages.required)
  .test("titleValidation", async function (value) {
    if (!value) return true;
    const result = await ProjectRepository.validateProjectFields({
      title: value,
    });

    if (isLeft(result)) {
      if (this.parent._errors?.codeValidation) {
        delete this.parent._errors.codeValidation;
      }
      return this.createError({ message: mapProjectsErrors(result.left) });
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

export const projectCodeValidationToUpdate = Yup.string()
  .required(ValidationErrorMessages.required)
  .test("codeValidationToUpdate", async function (value) {
    if (!value) return false;
    const result = await ProjectRepository.validateProjectFieldToUpdate(
      this.parent.id,
      {
        code: value,
      }
    );

    if (isLeft(result)) {
      if (this.parent._errors?.codeValidation) {
        delete this.parent._errors.codeValidation;
      }
      return this.createError({ message: mapProjectsErrors(result.left) });
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

export const projectTitleValidationToUpdate = Yup.string()
  .required(ValidationErrorMessages.required)
  .test("titleValidationToUpdate", async function (value) {
    if (!value) return true;
    const result = await ProjectRepository.validateProjectFieldToUpdate(
      this.parent.id,
      {
        title: value,
      }
    );

    if (isLeft(result)) {
      if (this.parent._errors?.codeValidation) {
        delete this.parent._errors.codeValidation;
      }
      return this.createError({ message: mapProjectsErrors(result.left) });
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
