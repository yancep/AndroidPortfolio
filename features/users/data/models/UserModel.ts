import { UserOptionalAttributes } from "@/features/users/data/models/UserOptionalAttributes";

export interface UserModel extends UserOptionalAttributes {
  url: string;
  username: string;
  id: string;
}
