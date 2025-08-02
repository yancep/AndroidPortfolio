import { CustomPagination } from "@/core/api/BaseState";
import { Query } from "@/core/api/services/url.service";
import {
  RegisterUserPayload,
  UpdateUserPayload,
} from "@/features/authentication/data/payload/AuthenticationPayloads";
import { UsersDataModuleSymbols } from "@/features/users/data/UsersDataModuleSymbols";
import { User } from "@/features/users/domain/entities/User";
import { ApplicationContainer } from "@/ioc/application.container";
import { Either } from "fp-ts/Either";
import {
  ChangePasswordUserMePayload,
  ChangeUserPasswordPayload,
} from "../../data/models/payloads";

export interface UserRepository {
  getUsers: (request: Query) => Promise<Either<string, CustomPagination<User>>>;

  getUser: (id: string) => Promise<Either<string, User>>;

  getUserByUrl: (url: string, request: Query) => Promise<Either<string, User>>;

  registerUser: (
    request: RegisterUserPayload,
    headers?: Record<string, string>
  ) => Promise<Either<string, any>>;

  getUserMe: () => Promise<Either<string, User>>;

  updateUserMe: (request: any) => Promise<Either<string, any>>;

  changePasswordUserMe: (
    data: ChangePasswordUserMePayload
  ) => Promise<Either<string, User>>;

  changeUserPassword: (
    id: string,
    data: ChangeUserPasswordPayload
  ) => Promise<Either<string, User>>;

  updateUser: (
    id: string,
    request: UpdateUserPayload
  ) => Promise<Either<string, User>>;

  validateUserField: (
    field: string,
    value: string,
    id?: string
  ) => Promise<boolean>;
}

export const usersRepository = ApplicationContainer.get<UserRepository>(
  UsersDataModuleSymbols.USERS_REPOSITORY
);
