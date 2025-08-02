import { SuccessToast } from "@/components/toast/SuccessToast";
import { BaseState, CustomPagination } from "@/core/api/BaseState";
import { create } from "zustand";

import { ErrorToast } from "@/components/toast/ErrorToast";
import { Query } from "@/core/api/services/url.service";
import {
  UpdateUserPayload
} from "@/features/authentication/data/payload/AuthenticationPayloads";
import { ChangeUserPasswordPayload } from "@/features/users/data/models/payloads";
import { User } from "@/features/users/domain/entities/User";
import { usersRepository } from "@/features/users/domain/repositories/UsersRepository";

interface UsersStore extends BaseState<CustomPagination<User>> {
  getUsers: (request: Query) => Promise<void>;
  updateUser: (id: string, request: UpdateUserPayload) => Promise<void>;
  changeUserPassword: (
    id: string,
    request: ChangeUserPasswordPayload
  ) => Promise<void>;
}

export const useUsersStore = create<UsersStore>()((setState, getState) => ({
  isLoading: false,
  data: null,
  listData: null,
  error: null,

  getUsers: async (request) => {
    setState(() => ({ isLoading: true }));

    const response = await usersRepository.getUsers(request);
    if (response._tag === "Right") {
      setState(() => ({ data: response.right, isLoading: false }));
    } else {
      setState(() => ({ error: response.left, isLoading: false }));
    }
  },

  updateUser: async (id, data) => {
    setState(() => ({ isLoading: true }));
    const state = getState();
    const response = await usersRepository.updateUser(id, data);
    if (response._tag === "Left") {
      setState(() => ({ error: response.left, isLoading: false }));
    } else {
      const updatedData =
        state.data?.data.map((user) => {
          if (user.id === response.right.id) {
            return response.right;
          }
          return user;
        }) || [];
      setState(() => ({
        data: {
          ...state.data,
          data: updatedData,
          meta: state.data?.meta || {
            itemCount: updatedData.length,
            pageCount: 1,
            next: null,
            currentPage: 1,
            nextPage: null,
            previousPage: null,
            previous: null,
          },
        },
        isLoading: false,
      }));
      SuccessToast();
    }
  },

  changeUserPassword: async (id, data) => {
    const response = await usersRepository.changeUserPassword(id, data);

    if (response._tag === "Right") {
      SuccessToast();
    } else {
      ErrorToast(response.left);
    }
  },
}));
