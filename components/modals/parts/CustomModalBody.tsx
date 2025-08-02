import { ReactNode } from 'react';
import { ModalBody } from "@heroui/react";

export default function CustomModalBody({ children }: { children: ReactNode }) {
  return (
    <ModalBody
      style={{
        maxHeight: '60vh',
        background: "#F9FAFC"
      }}
    >
      {children}
    </ModalBody>
  );
}
