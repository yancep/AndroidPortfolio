/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorData, SuccessData } from "@/core/api/errors/HandleResponse";
import { TokenService } from "@/core/services/token/token.service";
import { AuthenticationRepository } from "@/features/authentication/domain/repositories/AuthenticationRepository";
import { Either } from "fp-ts/lib/Either";
import { AuthenticationDataSources } from "../data_sources/AuthenticationDataSources";
import { AuthenticationModelToAuthentication } from "../mappers/AuthenticationMapper";
import { AuthenticationModel } from "../models/AuthenticationModel";

export const AuthenticationRepositoryImpl = (
  authenticationDataSources: AuthenticationDataSources,
  tokenService: TokenService
): AuthenticationRepository => ({
  login: async (request) => {
    try {
      const response = await authenticationDataSources.login(request);

      const auth: AuthenticationModel = response.data;
      tokenService.setSessionInStorage({
        access: auth.access,
        refresh: auth.refresh,
        userId: auth.user.id,
        role: "ENTITY_MANAGER",
        entityId: auth.user.profile.entityId,
      });

      return SuccessData(AuthenticationModelToAuthentication(auth));
    } catch (error: any) {
      return ErrorData(error);
    }
  },

  logout: async () => {
    try {
      const access = ( await tokenService.getSessionFromStorage())?.refresh;

      const response = await authenticationDataSources.logout(access!);

      if (response) {
        tokenService.removeSession();
      }

      return SuccessData(response);
    } catch (e) {
      return ErrorData(e);
    }
  },

  resetPassword: async (data) => {
    try {
      const response = await authenticationDataSources.resetPassword(data);
      return SuccessData(response);
    } catch (error: any) {
      return ErrorData("error");
    }
  },

  validateTokenForResetPassword: async (request) => {
    try {
      const response =
        await authenticationDataSources.validateTokenForResetPassword(request);

      return SuccessData(response);
    } catch (error: any) {
      return ErrorData(error);
    }
  },

  confirmResetPassword: async (request) => {
    try {
      const response =
        await authenticationDataSources.confirmPasswordReset(request);
      return SuccessData(response);
    } catch (error: any) {
      return ErrorData(error);
    }
  },
  decodeToken: async function (request): Promise<Either<string, any>> {
    try {
      const response = await authenticationDataSources.decodeToken(request);
      return SuccessData(response);
    } catch (error: any) {
      return ErrorData(error);
    }
  },
});
