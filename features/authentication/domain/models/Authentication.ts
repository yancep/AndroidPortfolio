import { UserLoginModel } from "@/features/users/data/models/UserLoginModel";

export type Authentication = {
  readonly user: UserLoginModel;
  readonly access: string;
  readonly refresh: string;
  readonly entityId: string;
};
