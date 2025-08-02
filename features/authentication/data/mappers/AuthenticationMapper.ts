import { Authentication } from "@/features/authentication/domain/models/Authentication";
import { AuthenticationModel } from "../models/AuthenticationModel";

export const AuthenticationModelToAuthentication = (
  model: AuthenticationModel
): Authentication => {
  return {
    user: model.user,
    access: model.access,
    refresh: model.refresh,
    entityId: model.user.profile.entityId,
  };
};
