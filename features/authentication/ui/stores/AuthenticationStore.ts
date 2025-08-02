 
import { ErrorToast } from "@/components/toast/ErrorToast";
import { SuccessToast } from "@/components/toast/SuccessToast";
import { showToast } from "@/components/toast/Toast";
import { createSelectorsWrapper } from "@/core/state/ConfigSelectors";
import { authenticationRepository } from "@/features/authentication/domain/repositories/AuthenticationRepository";
import {
  ResetPasswordEmailPayload,
  ResetPasswordPayload,
  ValidateTokenPayload,
} from "@/features/users/data/models/payloads";
import { create } from "zustand";
import { Authentication } from "../../domain/models/Authentication";
import { loginUseCase, logoutUseCase } from "../../domain/useCases";

type Actions = {
  login: (data: {
    email: string;
    password: string;
  }) => Promise<Authentication | null>;
  logout: () => Promise<boolean>;
};

type ResetPasswordActions = {
  confirmResetPassword: (request: ResetPasswordPayload) => Promise<boolean>;
  resetPassword: (request: ResetPasswordEmailPayload) => void;
  validateToken: (request: ValidateTokenPayload) => Promise<boolean>;
};

export const useAuthenticationStore = create<Actions & ResetPasswordActions>(
  () => ({
    login: async (request) => {
      const response = await loginUseCase.execute(request);

      if (response._tag === "Right") {
        return response.right;
      } else {
        ErrorToast(response.left);
        return null;
      }
    },

    logout: async () => {
      const response = await logoutUseCase.execute();
      if (response._tag === "Left") {
        showToast(response.left, "error");
        return false;
      } else {
        return true;
      }
    },

    resetPassword: async (request) => {
      const response = await authenticationRepository.resetPassword(request);

      if (response._tag === "Right") {
        showToast(
          `Las instrucciones para el restablecimiento de la contraseña han sido enviadas al correo ${request.email}.`,
          "success",
          1200
        );
      } else {
        ErrorToast(
          `No se encontró una cuenta asociada al correo: ${request.email}, pruebe un correo diferente.`
        );
      }
    },

    validateToken: async (request) => {
      const response =
        await authenticationRepository.validateTokenForResetPassword(request);
      if (response._tag === "Right") {
        return true;
      } else {
        showToast(
          "El token de recuperación es inválido. Usted será redireccionado al inicio de sesión.",
          "error",
          1200
        );
        return false;
      }
    },
    confirmResetPassword: async (request) => {
      const response =
        await authenticationRepository.confirmResetPassword(request);

      if (response._tag === "Right") {
        SuccessToast();
        return true;
      } else {
        ErrorToast(response.left);
        return false;
      }
    },
  })
);

export const AuthenticationSelectionsStore = createSelectorsWrapper(
  useAuthenticationStore
);
