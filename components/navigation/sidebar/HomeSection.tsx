/* eslint-disable @typescript-eslint/no-explicit-any */
import { APP_ROUTES } from "@/core/routes/routes";
import { Divider, Spacer } from "@heroui/react";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { AppAdminIcon, AppHomeIcon } from "../../Icons/app/sideBarIcons";

interface Props {
  isSidebarOpen: boolean;
  pathname: string;
  user: any;
}

export default function HomeSection({ isSidebarOpen, pathname, user }: Props) {
  return user?.isAdmin && pathname.includes("entidad") ? (
    <Link
      key={"home"}
      href={"APP_ADMIN_ROUTES.PCT"}
      className="my-0.5 flex w-full items-center justify-start rounded-lg px-1 py-2 text-medium hover:bg-default-100"
    >
      <Divider
        style={{
          width: 5,
          height: 30,
          borderRadius: 50,
          background: "transparent",
        }}
        orientation="vertical"
      />
      <Spacer />

      <div
        style={{
          cursor: "pointer",
          borderRadius: 10,
          width: 300,
          padding: 10,
          height: 50,
          textWrap: "nowrap",
        }}
        className={clsx(
          "flex items-center justify-start p-2 text-medium hover:bg-default-100"
        )}
      >
        <AppAdminIcon />
        <Spacer />
        {!isSidebarOpen && <p className="pl-3 ">Administración</p>}
      </div>
    </Link>
  ) : (
    <Link
      key={"home"}
      href={APP_ROUTES.HOME}
      passHref
      className="flex w-full items-center justify-between"
    >
      <Divider
        style={{
          width: 5,
          height: 30,
          borderRadius: 50,
          background: "transparent",
        }}
        orientation="vertical"
      />
      <Spacer />

      <div
        style={{
          cursor: "pointer",
          borderRadius: 10,
          width: 300,
          padding: 10,
          height: 50,
          textWrap: "nowrap",
        }}
        className={clsx(
          "flex items-center justify-start p-2 text-medium hover:bg-default-100"
        )}
      >
        <AppHomeIcon />
        <Spacer />
        {!isSidebarOpen && <p className="pl-3 ">Inicio</p>}
      </div>
    </Link>
  );
}
