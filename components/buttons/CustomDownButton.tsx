'use client';
import { VerticalDotsIcon } from '@/components/Icons/extra/TableIcons';
import VinculeIcon from '@/components/Icons/extra/VinculeIcon';
import {
  Button,
  Divider,
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
import { EditIcon } from "@heroui/shared-icons";
import { ReactNode, useState } from 'react';

export function CustomDropDownButton<T>({
  deleteFunction,
  form,
  form2,
  isDeletedPossible,
  formProps,
  form2Props,
  onlySustitution,
  projectActions,
  onlySubstitutionText: onlySustitucionText,
  onlyModify,
  deleteText,
  deleteIcon,
}: {
  onlySustitution?: boolean;
  projectActions?: boolean;
  onlySubstitutionText?: string;
  onlyModify?: boolean;

  formProps?: {
    button1?: string;
    button2?: string;
  };
  form2Props?: {
    button1?: string;
    button2?: string;
  };

  form?: (
    currentStep: number,
    setStep: (step: number) => void,
    closeModal: () => void,
  ) => ReactNode;

  form2?: (
    currentStep: number,
    setStep: (step: number) => void,
    closeModal: () => void,
  ) => ReactNode;

  deleteFunction?: () => void;
  deleteText?: string;
  deleteIcon?: ReactNode;
  isDeletedPossible?: boolean;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  const [currentStep, setCurrentStep] = useState<number>(0);

  return (
    <>
      <Dropdown className="border-1 border-default-200 bg-background">
        <DropdownTrigger>
          <Button isIconOnly radius="full" size="sm">
            <VerticalDotsIcon />
          </Button>
        </DropdownTrigger>
        {projectActions ? (
          <DropdownMenu>
            <DropdownItem
              startContent={<VinculeIcon />}
              key="delete"
              onPress={onOpen}
            >
              {onlySustitucionText ?? 'Sustituir'}
            </DropdownItem>
            <DropdownItem
              startContent={<VinculeIcon />}
              key="delete"
              onPress={onOpenDelete}
            >
              {'Eliminar'}
            </DropdownItem>
          </DropdownMenu>
        ) : onlySustitution ? (
          <DropdownMenu>
            <DropdownItem
              startContent={<VinculeIcon />}
              key="delete"
              onPress={onOpen}
            >
              {onlySustitucionText ?? 'Sustituir'}
            </DropdownItem>
          </DropdownMenu>
        ) : isDeletedPossible ? (
          <DropdownMenu>
            <DropdownItem
              startContent={<EditIcon />}
              key="edit"
              onPress={onOpen}
            >
              {formProps?.button1 ?? 'Modificar'}
            </DropdownItem>
            <DropdownItem
              startContent={deleteIcon ?? <VinculeIcon />}
              key="delete"
              onPress={onOpenDelete}
            >
              {deleteText ?? 'Desvincular'}
            </DropdownItem>
          </DropdownMenu>
        ) : onlyModify ? (
          <DropdownMenu>
            <DropdownItem
              startContent={<EditIcon />}
              key="edit"
              onPress={onOpen}
            >
              {'Modificar'}
            </DropdownItem>
          </DropdownMenu>
        ) : (
          <DropdownMenu>
            <DropdownItem
              startContent={<EditIcon />}
              key="edit"
              onPress={onOpen}
            >
              {form2Props?.button2 ?? 'Modificar'}
            </DropdownItem>
            <DropdownItem
              startContent={<VinculeIcon />}
              key="delete"
              onPress={onOpen2}
            >
              {form2Props?.button2 ?? 'Sustituir'}
            </DropdownItem>
          </DropdownMenu>
        )}
      </Dropdown>
      {form && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onClose}
          isDismissable={false}
          scrollBehavior="inside"
          size={'xl'}
          isKeyboardDismissDisabled={true}
        >
          <ModalContent style={{ maxHeight: '95vh' }}>
            {form(currentStep, setCurrentStep, onClose)}
          </ModalContent>
        </Modal>
      )}
      {form2 && (
        <Modal
          isOpen={isOpen2}
          onOpenChange={onClose2}
          isDismissable={false}
          scrollBehavior="inside"
          size={'xl'}
          isKeyboardDismissDisabled={true}
        >
          <ModalContent style={{ maxHeight: '95vh' }}>
            {form2(currentStep, setCurrentStep, onClose)}
          </ModalContent>
        </Modal>
      )}
      <Modal
        isOpen={isOpenDelete}
        onOpenChange={onCloseDelete}
        isDismissable={false}
        size={'md'}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          <ModalHeader>Confirmar</ModalHeader>
          <Divider />
          <ModalBody className={'p-4'}>
            ¿ Está seguro de que desea continuar ? Esta acción no se puede
            deshacer.
          </ModalBody>
          <Divider />

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
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
