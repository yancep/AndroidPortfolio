import { ErrorToast } from "@/components/toast/ErrorToast";
import { SuccessToast } from "@/components/toast/SuccessToast";
import {
  BaseAppState,
  LoadingState,
  SuccessState,
} from "@/core/state/BaseAppState";
import { RegisterUserPayload } from "@/features/authentication/data/payload/AuthenticationPayloads";
import { User } from "@/features/users/domain/entities/User";
import { ApplicationContainer } from "@/ioc/application.container";
import { create } from "zustand";
import {
  ChangePasswordUserMePayload,
  UpdateUserMePayload,
} from "../../data/models/payloads";
import { UsersDataModuleSymbols } from "../../data/UsersDataModuleSymbols";
import { UserRepository } from "../../domain/repositories/UsersRepository";

const userRepository = ApplicationContainer.get<UserRepository>(
  UsersDataModuleSymbols.USERS_REPOSITORY
);

type Events = {
  setUser: (user: User) => void;
  getUserMe: () => void;
  changePasswordUserMe: (
    request: ChangePasswordUserMePayload
  ) => Promise<boolean>;
  updateUserMe: (request: UpdateUserMePayload) => Promise<User>;
  registerUser: (
    request: RegisterUserPayload,
    headers?: Record<string, string>
  ) => Promise<boolean>;
};

export const useUserStore = create<BaseAppState<User> & Events>((setState) => ({
  data: null,
  error: null,
  isLoading: false,
  isEmpty: false,

  setUser: (user) => {
    setState(SuccessState(user));
  },

  getUserMe: async () => {
    setState(LoadingState);
    const response = await userRepository.getUserMe();
    if (response._tag === "Right") setState(() => SuccessState(response.right));
  },

  updateUserMe: async (request) => {
    const response = await userRepository.updateUserMe(request);
    if (response._tag === "Right") {
      SuccessToast();
      return response.right;
    } else {
      ErrorToast(response.left);
      return null;
    }
  },

  changePasswordUserMe: async (request) => {
    const response = await userRepository.changePasswordUserMe(request);
    if (response._tag === "Right") {
      SuccessToast();
      return true;
    } else {
      ErrorToast(response.left);
      return false;
    }
  },

  registerUser: async (request, headers) => {
    const response = await userRepository.registerUser(request, headers);
    if (response._tag === "Right") {
      SuccessToast();
      return true;
    } else {
      ErrorToast("Error al registrar el usuario");
      return false;
    }
  },
}));
