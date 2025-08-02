import { CustomToolTip } from '@/components/tooltip/CustomTooltip';
import { Button, ButtonProps } from '@heroui/react';
import React, { ReactNode } from 'react';

export interface CustomButtonProps extends ButtonProps {
  icon? : ReactNode;
  info? : string;
  className? : string;
};

export const CustomIconButton : React.FC<CustomButtonProps> = (
	{
	  color = 'default',
	  variant = 'solid',
	  size = 'sm',
	  isDisabled = false,
	  icon,
	  onPress,
	  className,
	  info,
	  children,
	  isLoading = false,
	  type = 'button',
	  ...props
	} ) => {
	return info ? (
	  <CustomToolTip info={ info }>
		<Button
		  { ...props }
		  size={ size }
		  className={ className }
		  startContent={ !isLoading && <div className={ 'p-2' }>{ icon }</div> }
		  type={ type }
		  onPress={ onPress }
		  isDisabled={ isDisabled }
		  color={ color }
		  variant={ variant }
		  isIconOnly
		  isLoading={ isLoading }
		  radius={ 'full' }
		>
		  { children }
		</Button>
	  </CustomToolTip>
	) : (
	  <Button
		{ ...props }
		size={ size }
		className={ className }
		startContent={ !isLoading && <div className={ 'p-2' }>{ icon }</div> }
		type={ type }
		onPress={ onPress }
		isDisabled={ isDisabled }
		color={ color }
		variant={ variant }
		isIconOnly
		isLoading={ isLoading }
		radius={ 'full' }
	  >
		{ children }
	  </Button>
	);
  }
;
