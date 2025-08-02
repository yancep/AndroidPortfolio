import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

export function DeleteModal({
  text,
  subtext,
  isOpenDelete,
  id,
  deleteFunction,
  onCloseDelete,
  headerMessage,
  bodyMessage,
}: {
  text?: string;
  subtext?: string;
  isOpenDelete: boolean;
  id: string;
  onCloseDelete: () => void;
  deleteFunction: (id: string) => void;
  headerMessage?: string;
  bodyMessage?: string;
}) {
  return (
    <Modal
      isOpen={isOpenDelete}
      onOpenChange={onCloseDelete}
      isDismissable={false}
      size={"md"}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        <ModalHeader>
          {headerMessage ? headerMessage : "Confirmar eliminar"}
        </ModalHeader>
        <ModalBody>
          {bodyMessage ? bodyMessage : "¿Está seguro de que desea continuar?"}
        </ModalBody>
        <ModalFooter className={"flex flex-row justify-end"}>
          <Button variant="solid" color="default" onPress={onCloseDelete}>
            Cancelar
          </Button>
          <Button
            variant="solid"
            color="danger"
            title="Desvincular"
            onPress={async () => {
              if (deleteFunction) await deleteFunction(id);
              onCloseDelete();
            }}
            isLoading={false}
          >
            Eliminar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
