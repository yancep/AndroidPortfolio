import { User as UserEntity } from '@/features/users/domain/entities/User';
import ListProfileActions from "@/features/users/ui/components/modals/ListProfileActions";
import { Popover, PopoverContent, PopoverTrigger, User } from "@heroui/react";
import React, { useState } from "react";


export default function UserPopover( { user, handleOpenModal, handelOpenLogoutModal } : {
  user : UserEntity,
  handleOpenModal : () => void,
  handelOpenLogoutModal? : () => void
} ) {
  
  const [isOpen, setIsOpen] = useState( false )
  
  return (
	<Popover isOpen={ isOpen } onOpenChange={ ( open ) => setIsOpen( open ) }>
	  <PopoverTrigger>
		<User
		  as={ 'button' }
		  name={ '' }
		  description={ '' }
		  avatarProps={ {
			fallback : user?.username?.charAt( 0 ).toUpperCase(),
			showFallback : true,
			isBordered : false,
			src : '' as string,
		  } }
		  className={ 'transition-transform' }
		/>
	  </PopoverTrigger>
	  <PopoverContent className="p-2">
		<ListProfileActions user={ user } handleOpenModal={ () => {
		  handleOpenModal();
		  setIsOpen( false );
		} } handelOpenLogoutModal={ handelOpenLogoutModal }
		/>
	  </PopoverContent>
	</Popover>
  );
}

