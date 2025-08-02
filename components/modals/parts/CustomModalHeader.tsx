import { ModalHeader } from "@heroui/react";
import { ReactNode } from 'react';

export default function CustomModalHeader({
  children,
  maxHeight,
}: {
  children: ReactNode;
  maxHeight?: string;
}) {
  return (
    <ModalHeader
      className="flex flex-col gap-1"
      style={{
        maxHeight: maxHeight ?? '10vh',
      }}
    >
      {children}
    </ModalHeader>
  );
}
