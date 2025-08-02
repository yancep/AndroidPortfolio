"use client";
import { CustomAsyncButton } from "@/components/buttons/CustomAsyncButton";
import CustomTextInput from "@/components/inputs/basic/CustomTextInput";
import { defaultValidation } from "@/core/common/validations/defaultValidations";
import { emailRegex } from "@/core/common/validations/regexs";
import translateSystem from "@/core/locales/i18next";
import { APP_ENTITY_ROUTES, APP_ROUTES } from "@/core/routes/routes";
import { AuthenticationSelectionsStore } from "@/features/authentication/ui/stores/AuthenticationStore";
import { mapUserLoginModelToUser } from "@/features/users/data/mappers/UserMapper";
import { useUserStore } from "@/features/users/ui/store/useUserStore";
import { Input } from "@heroui/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import * as Yup from "yup";

export const LoginForm = () => {
  const profileStore = useUserStore((state) => state);
  const login = AuthenticationSelectionsStore.use.login();
  const router = useRouter();
  const toggleVisibilityPass = useCallback(
    () => setPassVisible((passVisible) => !passVisible),
    []
  );
  const [passVisible, setPassVisible] = useState(false);

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
          .required( 'Campo requerido' )
          .trim()
          .email( 'Formato incorrecto' )
          .matches( emailRegex, 'Formato incorrecto' ),
      password: defaultValidation,
    }),
    validateOnChange: true,
    onSubmit: async (values) => {
      const response = await login({
        email: values.email,
        password: values.password,
      });
      if (response) {
        profileStore.setUser(mapUserLoginModelToUser(response.user));
        const entityId = response.user.profile.entityId;
        if (entityId) {
          router.replace(`${APP_ENTITY_ROUTES.ENTITIES(entityId)}`);
        } else {
          router.replace(APP_ROUTES.LOGIN);
        }
      }
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && form.isValid) {
      form.handleSubmit();
    }
  };

  return (
    <form onSubmit={form.handleSubmit} className="space-y-6">
      <CustomTextInput
        form={form}
        formKey={"email"}
        label={"Correo electrónico"}
        placeholder={"Correo electrónico"}
        isRequired={true}
      />
      <div className="flex flex-col">
        <span className="text-sm text-foreground opacity-70">Contraseña</span>
        <Input
          id="password"
          variant="bordered"
          fullWidth
          type={passVisible ? "text" : "password"}
          size="md"
          onChange={(e) => {
            form.handleChange(e);
            form.setFieldValue("password", e.target.value);
          }}
          onKeyDown={handleKeyDown} 
          color={
            form.touched.password && form.errors.password ? "danger" : "primary"
          }
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibilityPass}
            >
              {passVisible ? <FiEye /> : <FiEyeOff />}
            </button>
          }
          value={form.values.password}
          placeholder="********"
        />
      </div>

      <div className="flex flex-row items-center justify-end text-sm text-primary">
        <Link
          href={APP_ROUTES.RESET_PASSWORD}
          className="flex flex-row items-center"
        >
          <span>
            {translateSystem.t("inputs.labels.password.passwordRecovery")}
          </span>
        </Link>
      </div>

      <CustomAsyncButton
        isFullWidth={true}
        variant="solid"
        color="primary"
        isDisabled={!form.isValid || form.isSubmitting}
        onClick={form.handleSubmit}
        title={"Iniciar Sesión"}
        isLoading={form.isSubmitting}
      />
    </form>
  );
};