import { CustomAsyncButton } from '@/components/buttons/CustomAsyncButton';
import { APP_ROUTES } from '@/core/routes/routes';
import { useAuthenticationStore } from '@/features/authentication/ui/stores/AuthenticationStore';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { logout } = useAuthenticationStore();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Cerrar sesión</ModalHeader>
        <ModalBody className="flex flex-col gap-1">
          <p>¿Está seguro de cerrar la sesión?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="default" onPress={onClose}>
            Cancelar
          </Button>
          <CustomAsyncButton
            isLoading={isLoading}
            title="Cerrar"
            color="danger"
            variant="solid"
            onClick={async () => {
              setIsLoading(true);
              const response = await logout();
              setIsLoading(false);
              if (response) {
                router.replace(APP_ROUTES.LOGIN);
              }
            }}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
