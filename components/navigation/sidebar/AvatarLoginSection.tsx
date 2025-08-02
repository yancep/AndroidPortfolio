import { ProfileConfig } from "@/features/users/ui/components/modals/ProfileConfig";
import { useUserStore } from "@/features/users/ui/store/useUserStore";
import {
  Divider,
  Modal,
  ModalContent,
  useDisclosure,
  User
} from "@heroui/react";
import React, { useEffect } from "react";

export default function AvatarLoginSection({
  isSidebarOpen = true,
}: {
  isSidebarOpen: boolean;
}) {
  const { data: currentUser, getUserMe } = useUserStore();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (!currentUser) getUserMe();
  }, []);

  return (
    <>
      <div className={`flex items-center mb-4 pl-1 w-full justify-between`}>
        <div className="flex items-center">
          <User
            as="button"
            name={!isSidebarOpen ? currentUser?.username : ""}
            avatarProps={{
              fallback: currentUser?.username?.charAt(0).toUpperCase() || "A",
              showFallback: true,
              isBordered: false,
              src: "",
              onClick: () => onOpen(),
              className: "bg-green-300",
            }}
            classNames={{
              name: "font-semibold text-sm",
              description: "text-xs text-gray-500",
            }}
            className="transition-transform ml-1"
          />

          {currentUser && (
            <Modal
              isOpen={isOpen}
              onClose={onClose}
              size="4xl"
              scrollBehavior="inside"
            >
              <ModalContent className="h-[70vh]">
                <ProfileConfig user={currentUser} onCloseModal={onClose} />
              </ModalContent>
            </Modal>
          )}
        </div>
      </div>
      <Divider className="bg-gray-200" />
    </>
  );
}
