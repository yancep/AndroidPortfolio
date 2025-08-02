import {
  AppConfigIcon,
  HelpIcon,
} from "@/components/Icons/app/sideBarIcons";
import { User } from "@/features/users/domain/entities/User";
import { LogoutModal } from "@/features/users/ui/components/modals/LogoutModal";
import { ProfileConfig } from "@/features/users/ui/components/modals/ProfileConfig";
import { ModalContent, useDisclosure } from "@heroui/react";
import React from "react";
import { RxExit } from "react-icons/rx";

export interface SideBarState {
  isOpen: boolean;
}

interface ConfigSectionProps {
  user?: User | null;
  sideBarState: SideBarState;
  onLogout?: () => void;
}

type ConfigAction = {
  icon: React.ReactNode;
  label: string;
  action: () => void;
  modalContent?: React.ReactNode;
};

export default function ConfigSection({
  user,
  sideBarState,
  onLogout,
}: ConfigSectionProps) {
  const profileModal = useDisclosure();
  const helpModal = useDisclosure();
  const logoutModal = useDisclosure();

  const configActions: ConfigAction[] = [
    {
      icon: <AppConfigIcon width="25" height="25" />,
      label: "Configuración",
      action: profileModal.onOpen,
      modalContent: user && (
        <ModalContent className="h-[70vh]">
          <ProfileConfig user={user} onCloseModal={profileModal.onClose} />
        </ModalContent>
      ),
    },
    {
      icon: <HelpIcon width="25" height="25" />,
      label: "Ayuda",
      action: helpModal.onOpen,
      modalContent: (
        <ModalContent className="h-[70vh]">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Centro de Ayuda</h2>
            <p>Contenido de ayuda para el usuario...</p>
          </div>
        </ModalContent>
      ),
    },
    {
      icon: <RxExit className="w-5 h-5 text-red-500" />,
      label: "Cerrar Sesión",
      action: logoutModal.onOpen,
      modalContent: (
        <LogoutModal
          isOpen={logoutModal.isOpen}
          onClose={logoutModal.onClose}
        />
      ),
    },
  ];

  return (
    <div className="w-full border-t border-default-100 flex flex-col">
      {/*configActions.map((action) => (
        <React.Fragment key={action.label}>
          <Button
            className="flex w-full items-center justify-start rounded-none px-4 py-3 hover:bg-default-100 transition-colors"
            onPress={action.action}
            variant="light"
            fullWidth
            style={{
              textTransform: "none",
              color: "inherit",
              height: "50px",
              minHeight: "50px",
            }}
          >
            <div className="flex items-center gap-3 w-full">
              <span className="flex-shrink-0">{action.icon}</span>
              {!sideBarState.isOpen && (
                <span className="text-sm whitespace-nowrap">
                  {action.label}
                </span>
              )}
            </div>
          </Button>

          {action.modalContent && (
            <Modal
              isOpen={
                action.label === "Configuración"
                  ? profileModal.isOpen
                  : action.label === "Ayuda"
                    ? helpModal.isOpen
                    : action.label === "Cerrar Sesión"
                      ? logoutModal.isOpen
                      : false
              }
              onClose={
                action.label === "Configuración"
                  ? profileModal.onClose
                  : action.label === "Ayuda"
                    ? helpModal.onClose
                    : action.label === "Cerrar Sesión"
                      ? logoutModal.onClose
                      : () => {}
              }
              size="4xl"
              scrollBehavior="inside"
            >
              {action.modalContent}
            </Modal>
          )}
        </React.Fragment>
      ))*/}
    </div>
  );
}
