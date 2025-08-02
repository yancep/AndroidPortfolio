import { APP_THEME_COLOR, APP_THEME_VARIANT } from '@/core/theme/theme';
import { Button } from "@heroui/react";
import React from 'react';

type CustomButtonProps = {
  title: string;
  color?: APP_THEME_COLOR;
  variant?: APP_THEME_VARIANT;
  isDisabled?: boolean;
  onClick?: () => void;
  isFullWidth?: boolean;
  isLoading: boolean;
  icon?: React.ReactNode;
  className?: string
  size?: 'sm' | 'md' | 'lg'
};

export const CustomAsyncButton: React.FC<CustomButtonProps> = ({
  title,
  color = 'primary',
  variant = 'solid',
  onClick,
  isDisabled,
  isFullWidth = false,
  isLoading,
  icon,
  className,
  size
}) => {
  return (
    <Button
      startContent={icon ?? null}
      fullWidth={isFullWidth}
      type={'button'}
      onPress={onClick}
      isLoading={isLoading}
      isDisabled={isDisabled}
      color={color}
      size={size}
      variant={variant}
      className={className}
    >
      {title}
    </Button>
  );
};
