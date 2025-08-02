import { LogoutModal } from "@/features/users/ui/components/modals/LogoutModal";
import { ProfileConfig } from "@/features/users/ui/components/modals/ProfileConfig";
import UserPopover from "@/features/users/ui/components/modals/UserPoppover";
import { useUserStore } from "@/features/users/ui/store/useUserStore";
import {
  Divider,
  Modal,
  ModalContent,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Spacer,
  useDisclosure,
} from "@heroui/react";
import React, { ReactNode, useEffect } from "react";

export default function CustomNavBar({
  entities,
  brand,
}: {
  entities: any;
  brand?: ReactNode;
}) {
  const { data: currentUser, getUserMe, isLoading } = useUserStore();

  const {
    isOpen: isOpenModal,
    onClose: onCloseModal,
    onOpen: onOpenModal,
  } = useDisclosure();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (!currentUser || !currentUser.entity?.url) {
      getUserMe();
    }
  }, []);

  useEffect(() => {
    if (!isLoading && currentUser) {
      if (!currentUser?.identityCard) {
        onOpenModal();
      }
    }
  }, [currentUser, isLoading]);

  return (
    <>
      <Navbar maxWidth="full" isBordered>
        <NavbarBrand>
          {brand ?? (
            <div className={"flex flex-row items-center"}>
              {/* <AltGapidLogo />
              <Spacer />
              <span className="text-[20px] font-semibold text-inherit ">
                Plan de la ciencia
              </span> */}
            </div>
          )}
        </NavbarBrand>
        <Spacer />
        <NavbarContent justify="end">
          {entities && (
            // <NavbarItem>
            //   <Link
            //     className=" cursor-pointed flex flex-row items-center"
            //     href={APP_ENTITY_ROUTES.INFO(entities)}
            //   >
            //     <EntityIcon />
            //     <Spacer />
            //     <span>Mi entidad</span>
            //   </Link>
            // </NavbarItem>
            <></>
          )}
          <NavbarItem>
            <UserPopover
              user={currentUser!}
              handleOpenModal={onOpenModal}
              handelOpenLogoutModal={onOpen}
            />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      {currentUser && (
        <Modal
          isDismissable={!!currentUser.identityCard}
          isOpen={isOpenModal}
          onClose={() => (currentUser.identityCard ? onCloseModal() : {})}
          size={"4xl"}
          scrollBehavior={"inside"}
        >
          <ModalContent className={"h-[70vh]"}>
            <Divider />
            <ProfileConfig user={currentUser} onCloseModal={onCloseModal} />
          </ModalContent>
        </Modal>
      )}
      <LogoutModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
