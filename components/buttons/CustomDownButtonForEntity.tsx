'use client';

import { VerticalDotsIcon } from '@/components/Icons/extra/TableIcons';
import VinculeIcon from '@/components/Icons/extra/VinculeIcon';
import ModifyIcon from "@/public/icons/ModifyIcon";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import React, { ReactNode, useState } from 'react';

export function CustomDropDownButtonForEntity({
  deleteFunction,
  form,
  isDeletedPossible,
  editForm,
}: {
  form?: (
    currentStep: number,
    setStep: (step: number) => void,
    closeModal: () => void,
  ) => ReactNode;
  editForm: (
    entStep: number,
    setStep: (step: number) => void,
    closeModal: () => void,
  ) => ReactNode;
  deleteFunction: () => void;
  isDeletedPossible?: boolean;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const [currentStep, setCurrentStep] = useState<number>(0);

  return (
    <>
      <Dropdown className="border-1 border-default-200 bg-background">
        <DropdownTrigger>
          <Button isIconOnly radius="md" size="sm" variant="light">
            <VerticalDotsIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {form ? (
            <>
              <DropdownItem
                startContent={<ModifyIcon />}
                key="edit"
                onClick={onOpen}
              >
                Asignar
              </DropdownItem>
              <DropdownItem
                startContent={<ModifyIcon />}
                key="edit"
                onClick={onOpenEdit}
              >
                Modificar
              </DropdownItem>
              )
            </>
          ) : (
            <DropdownItem
              startContent={<ModifyIcon />}
              key="edit"
              onClick={onOpenEdit}
            >
              Modificar
            </DropdownItem>
          )}
          <DropdownItem
            startContent={<ModifyIcon />}
            key="edit"
            onClick={onOpenEdit}
          >
            Modificar
          </DropdownItem>
          <DropdownItem
            startContent={<VinculeIcon />}
            key="delete"
            onClick={onOpenDelete}
          >
            Desvincular
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {form && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onClose}
          isDismissable={false}
          size={'xl'}
          isKeyboardDismissDisabled={true}
        >
          <ModalContent>
            {form(currentStep, setCurrentStep, onClose)}
          </ModalContent>
        </Modal>
      )}
      <Modal
        key={'edit'}
        isOpen={isOpenEdit}
        onOpenChange={onCloseEdit}
        isDismissable={false}
        size={'xl'}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {editForm(currentStep, setCurrentStep, onCloseEdit)}
        </ModalContent>
      </Modal>
      <DeleteModal
        deleteFunction={deleteFunction}
        isOpenDelete={isOpenDelete}
        onCloseDelete={onCloseDelete}
      />
    </>
  );
}

function DeleteModal({
  isOpenDelete,
  deleteFunction,
  onCloseDelete,
}: {
  isOpenDelete: boolean;
  onCloseDelete: () => void;
  deleteFunction: () => void;
}) {
  return (
    <Modal
      isOpen={isOpenDelete}
      onOpenChange={onCloseDelete}
      isDismissable={false}
      size={'xl'}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        <ModalHeader>Confirmar desvinculación</ModalHeader>
        <ModalBody>¿Está seguro de que desea continuar?</ModalBody>
        <ModalFooter>
          <Button color="default" variant="light" onPress={onCloseDelete}>
            Cancelar
          </Button>
          <Button
            color="danger"
            onPress={async () => {
              if (deleteFunction) {
                await deleteFunction();
              }
              onCloseDelete();
            }}
          >
            Sí, confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
