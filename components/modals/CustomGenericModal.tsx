import {
  Modal,
  ModalContent,
} from "@heroui/react";
import React, { ReactNode } from 'react';

interface CustomGenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?:
    | 'xl'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | 'full';
}

export const CustomGenericModal = ({
  isOpen,
  onClose,
  children,
  size,
}: CustomGenericModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      isDismissable={false}
      size={size || 'xl'}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
       {children}
      </ModalContent>
    </Modal>
  );
};
