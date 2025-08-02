import { Spacer } from "@heroui/react";
import { ReactNode } from 'react';

interface NavBarProps {
  startIcon?: ReactNode;
  title: string;
  subtitle?: ReactNode;
  buttons?: ReactNode;
}

export function NavBar({ title, buttons, subtitle, startIcon }: NavBarProps) {
  return (
    <div className=" flex w-full flex-col pb-0 pl-4 pr-4">
      <div className="text-large font-semibold">
        <div className={'flex flex-row items-center'}>
          {startIcon}
          <Spacer />
          {title}
        </div>
      </div>
      <div>{subtitle}</div>
      <Spacer y={2} />
      {buttons ? buttons : <></>}
    </div>
  );
}

export function NavBarButtons({ buttons }: NavBarProps) {
  return (
    <div className="flex w-full flex-col">{buttons ? buttons : <></>}</div>
  );
}