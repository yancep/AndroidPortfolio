import { UserLoginModel } from "@/features/users/data/models/UserLoginModel";

export type AuthenticationModel = {
  readonly user: UserLoginModel;
  readonly access: string;
  readonly refresh: string;
};
