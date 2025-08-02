import React, { ReactNode } from 'react';
import { Button } from "@heroui/react";

export type CustomButtonProps = {
  icon?: ReactNode;
  title?: string;
  isDisabled?: boolean;
  onClick?: () => void;
  isButtonModal?: boolean;
  isIconOnly?: boolean;
};

export const PrimaryButton: React.FC<CustomButtonProps> = ({
  icon,
  title,
  onClick,
  isDisabled = false,
}) => {
  return (
    <Button
      startContent={icon}
      size={'md'}
      type={'button'}
      onClick={onClick}
      isDisabled={isDisabled}
      color={'primary'}
      variant={'solid'}
    >
      {title}
    </Button>
  );
};
