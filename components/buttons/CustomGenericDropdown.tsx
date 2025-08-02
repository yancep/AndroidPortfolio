'use client';

import { VerticalDotsIcon } from '@/components/Icons/extra/TableIcons';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import React, { ReactNode } from 'react';

export interface DropdownMenuItems <T> {
  label: string;
  icon: ReactNode;
  onClick: (item: T) => void;
}

interface CustomGenericDropdownProps <T> {
  menuItems: DropdownMenuItems<T>[];
  item: T
}

export function CustomGenericDropdown <T>({
  menuItems,
  item
}: CustomGenericDropdownProps <T>) {
  return (
    <>
      <Dropdown className="border-1 border-default-200 bg-background">
        <DropdownTrigger>
          <Button isIconOnly radius="full" size="sm" variant="light">
            <VerticalDotsIcon />
          </Button>
        </DropdownTrigger>

        <DropdownMenu>
          {menuItems.map((menuItem, index) => (
            <DropdownItem
              startContent={menuItem.icon}
              key={index}
              onClick={()=>menuItem.onClick(item)}
            >
              {menuItem.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
