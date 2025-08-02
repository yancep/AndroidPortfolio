import { SecondaryButton } from "@/components/buttons/AppButtons/SecondaryButton";
import { CustomAsyncButton } from "@/components/buttons/CustomAsyncButton";
import CustomSelect from "@/components/inputs/basic/CustomSelect";
import CustomTextInput from "@/components/inputs/basic/CustomTextInput";
import { EMAIL_LABEL } from "@/components/inputs/const/labels";
import { EMAIL_PLACEHOLDER } from "@/components/inputs/const/placeholder";
import CustomModalBody from "@/components/modals/parts/CustomModalBody";
import CustomModalFooter from "@/components/modals/parts/CustomModalFooter";
import CustomModalHeader from "@/components/modals/parts/CustomModalHeader";
import { ShowErrorToast, ShowSuccessToast } from "@/components/toast/Toast";
import { nameAndLastNameValidation } from "@/core/common/validations/personValidations";
import { Divider, Spacer } from "@heroui/react";
import { useFormik } from "formik";
import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import * as Yup from "yup";

interface PersonInvitationFormProps {
  onCloseModal: () => void;
  onSave?: () => void;
}

export const PersonInvitationForm = ({
  onCloseModal,
  onSave,
}: PersonInvitationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      name: nameAndLastNameValidation,
      lastName: nameAndLastNameValidation,
      identityNumber: Yup.string()
        .required("El número de documento es requerido")
        .length(11, "El número de documento debe tener 11 caracteres"),
      email: Yup.string()
        .email("Formato de email inválido")
        .required("El correo electrónico es requerido"),
      responsibility: Yup.string().required("La responsabilidad es requerida"),
    }),
    validateOnChange: true,
    initialValues: {
      name: "",
      lastName: "",
      identityNumber: "",
      email: "",
      responsibility: "",
      submit: null,
    },
    onSubmit: async (values, helpers) => {
      try {
        if (isLoading) return;

        setIsLoading(true);

        //TODO: Enviar invitación
        await new Promise((resolve) => setTimeout(resolve, 800));

        ShowSuccessToast();
        helpers.resetForm();

        if (onSave) {
          onSave();
        }

        onCloseModal();
      } catch (err) {
        const error = err as Error;
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        ShowErrorToast("Error al enviar la invitación");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CustomModalHeader>Invitar persona</CustomModalHeader>
      <Divider />
      <CustomModalBody>
        <div className="space-y-4">
          {/* Carnet de Identidad */}
          <CustomTextInput
            form={formik}
            formKey="identityNumber"
            placeholder="CI"
            label="Carnet de Identidad"
            isRequired={true}
          />

          {/* Nombre y Apellidos */}
          <div className="flex flex-row">
            <CustomTextInput
              form={formik}
              formKey="name"
              placeholder="Nombre"
              label="Nombre"
              isRequired={true}
            />
            <Spacer />
            <CustomTextInput
              form={formik}
              formKey="lastName"
              placeholder="Apellidos"
              label="Apellidos"
              isRequired={true}
            />
          </div>

          {/* Correo electrónico */}
          <CustomTextInput
            form={formik}
            formKey="email"
            placeholder={EMAIL_PLACEHOLDER}
            label={EMAIL_LABEL}
            isRequired={true}
            startContent={<MdEmail className="text-gray-400" />}
          />

          {/* Responsabilidad */}
          <CustomSelect
            items={[
              { key: "DIRECTOR", label: "Directivo", value: "DIRECTOR" },
              { key: "GESTOR", label: "Gestor", value: "GESTOR" },
            ]}
            form={formik}
            formKey="responsibility"
            label="Responsabilidad"
            isRequired={true}
            placeholder="Seleccione"
          />
        </div>
      </CustomModalBody>
      <Divider />
      <CustomModalFooter>
        <SecondaryButton onClick={onCloseModal} title="Cancelar" />
        <CustomAsyncButton
          isLoading={isLoading}
          isDisabled={!formik.isValid || formik.isSubmitting}
          color="primary"
          variant="solid"
          onClick={formik.submitForm}
          title="Invitar"
        />
      </CustomModalFooter>
    </form>
  );
};

export default PersonInvitationForm;
