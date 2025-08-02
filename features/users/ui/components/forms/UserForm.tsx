import { CustomAsyncButton } from "@/components/buttons/CustomAsyncButton";
import CustomSelect from "@/components/inputs/basic/CustomSelect";
import CustomTextInput from "@/components/inputs/basic/CustomTextInput";
import { numberValidation } from "@/core/common/validations/defaultValidations";
import { nameAndLastNameValidation } from "@/core/common/validations/personValidations";
import { cubanEmailUserValidation } from "@/core/common/validations/userValidations";
import { academicDegrees, scientificDegrees } from "@/core/constants/userDegrees";
import {
  AcademicDegreeNomenclature,
  ScientificDegreeNomenclature,
} from "@/features/shared/nomenclatures/domain/entities/PersonNomenclatures";
import { User as CurrentUser } from "@/features/users/domain/entities/User";
import { useUserStore } from "@/features/users/ui/store/useUserStore";
import { useFormik } from "formik";
import * as Yup from "yup";

export function UserForm({ user }: { user: CurrentUser }) {
  const { updateUserMe, setUser } = useUserStore();

  const form = useFormik({
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      email: cubanEmailUserValidation,
      phone: Yup.string().required("Teléfono es requerido"),
      identityCard: numberValidation,
      name: nameAndLastNameValidation,
      firstLastName: nameAndLastNameValidation,
      secondLastName: nameAndLastNameValidation,
      username: Yup.string()
        .required("Campo requerido")
        .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
        .max(16, "El nombre de usuario no puede exceder los 15 caracteres"),
    }),
    initialValues: {
      identityCard: user?.identityCard ?? "",
      name: user?.name ?? "",
      firstLastName: user?.firstLastName ?? "",
      secondLastName: user?.secondLastName ?? "",
      email: user?.email ?? "",
      username: user?.username ?? "",
      personId: user?.id ?? "",
      phone: user?.phone ?? "",
      scientificDegree: user?.scientificDegree ?? undefined,
      academicDegree: user?.academicDegree ?? undefined,
    },
    onSubmit: async (values) => {
      const updatedUser = await updateUserMe({
        profile: {
          identityCard: values.identityCard,
          firstLastName: values.firstLastName,
          secondLastName: values.secondLastName,
          name: values.name,
          phone: values.phone,
          academicDegree:
            values.academicDegree === "NONE"
              ? null
              : (values.academicDegree as AcademicDegreeNomenclature),
          scientificDegree:
            values.scientificDegree === "NONE"
              ? null
              : (values.scientificDegree as ScientificDegreeNomenclature),
        },
        email: values.email,
        username: values.username,
      });

      setUser(updatedUser);
    },
  });
  return (
    <form
      onSubmit={form.handleSubmit}
      className={
        "flex flex-col space-y-4 overflow-y-auto h-full w-full justify-between"
      }
    >
      <div className={"grid grid-cols-2 gap-4"}>
        <CustomTextInput
          form={form}
          formKey={"identityCard"}
          label={"Carnet de identidad"}
          placeholder={"############"}
          isRequired={true}
        />
        <CustomTextInput
          form={form}
          formKey="email"
          placeholder={"usuario@dominio.cu"}
          label={"Correo electrónico"}
          isRequired={true}
        />
        <CustomTextInput
          form={form}
          formKey="username"
          placeholder="Nombre de usuario"
          label="Nombre de usuario"
          isRequired={true}
        />
        <CustomTextInput
          form={form}
          formKey="name"
          placeholder="Escribe tu nombre"
          label="Nombre"
          isRequired={true}
        />
        <CustomTextInput
          form={form}
          formKey="firstLastName"
          placeholder="Primer apellido"
          label="Primer Apellido"
          isRequired={true}
        />
        <CustomTextInput
          form={form}
          formKey="secondLastName"
          placeholder="Segundo apellido"
          label="Segundo Apellido"
          isRequired={true}
        />
        <CustomTextInput
          form={form}
          formKey={"phone"}
          label={"Teléfono de contacto"}
          placeholder={"Teléfono"}
          isRequired={true}
          inputType={"phone"}
        />
        <CustomSelect
          items={academicDegrees}
          form={form}
          formKey={"academicDegree"}
          label={"Grado académico"}
          defaultSelectedValue={form.values.academicDegree as string}
          isRequired={false}
          mapKey={(item) => item.key}
          mapItem={(item) => item.label}
          placeholder={"Grado académico"}
        />
        <div className="col-span-2">
          <CustomSelect
            items={scientificDegrees}
            form={form}
            formKey={"scientificDegree"}
            label={"Grado científico"}
            defaultSelectedValue={form.values.scientificDegree as string}
            isRequired={false}
            mapKey={(item) => item.key}
            mapItem={(item) => item.label}
            placeholder={"Grado científico"}
          />
        </div>
      </div>
      <div
        className={"bottom-0 flex flex-row justify-end items-center space-x-2 "}
      >
        <CustomAsyncButton
          title={"Guardar"}
          color={"primary"}
          variant={"solid"}
          isDisabled={!form.isValid}
          onClick={form.submitForm}
          isLoading={form.isSubmitting}
        />
      </div>
    </form>
  );
}
