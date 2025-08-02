/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { Authentication } from '@/features/authentication/domain/models/Authentication';
import { AuthenticationRequest } from '@/features/authentication/domain/request/AuthenticationRequest';
import {
  DecodeTokenPayload,
  ResetPasswordEmailPayload,
  ResetPasswordPayload,
  ValidateTokenPayload,
} from '@/features/users/data/models/payloads';
import { ApplicationContainer } from '@/ioc/application.container';
import { Either } from 'fp-ts/Either';
import { AuthenticationServicesSymbols } from '../../ioc/AuthenticationServiceSymbols';

export interface AuthenticationRepository {
  login: (
    request: AuthenticationRequest,
  ) => Promise<Either<string, Authentication>>;

  logout: () => Promise<Either<string, any>>;

  resetPassword: (
    request: ResetPasswordEmailPayload,
  ) => Promise<Either<string, any>>;

  validateTokenForResetPassword: (
    request: ValidateTokenPayload,
  ) => Promise<Either<string, any>>;

  confirmResetPassword: (
    request: ResetPasswordPayload,
  ) => Promise<Either<string, any>>;

  decodeToken: (request: DecodeTokenPayload) => Promise<Either<string, any>>;
}

export const authenticationRepository = ApplicationContainer.get<AuthenticationRepository>(
  AuthenticationServicesSymbols.repositories.AUTHENTICATION_REPOSITORY,
);
