import { User as CurrentUser } from "@/features/users/domain/entities/User";
import { UserForm } from "@/features/users/ui/components/forms/UserForm";
import React from "react";

export default function PersonalInformationSection({
  user,
}: {
  user: CurrentUser;
}) {
  return (
    <div className={"flex flex-col w-full h-full space-y-4"}>
      <span className={"text-2xl font-semibold"}>Información personal</span>
      {<UserForm user={user} />}
    </div>
  );
}
