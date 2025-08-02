import { APP_THEME_COLOR } from '@/core/theme/theme';
import { Tooltip } from "@heroui/react";
import React, { ReactNode, useEffect, useRef, useState } from 'react';

export function CustomToolTip({
  children,
  info,
  properties,
}: {
  children: ReactNode;
  info: ReactNode;
  properties?: {
    offset?: number;
    color?: APP_THEME_COLOR;
  };
}) {
  return (
    <Tooltip
      placement={'bottom'}
      delay={0}
      offset={properties?.offset ?? 5}
      closeDelay={0}
      content={info}
      color={properties?.color ?? 'default'}
    >
      {children}
    </Tooltip>
  );
}

export function CustomToolTipWithOverFlow({
  info,
  children,
  valueRef,
}: {
  info: string;
  children: ReactNode;
  valueRef: string;
}) {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    if (textRef.current) {
      const { scrollWidth, clientWidth } = textRef.current;
      setIsOverflowing(scrollWidth > clientWidth);
    }
  }, [info, valueRef]);

  return (
    <div className="relative">
      <div
        className="flex w-full flex-col overflow-x-hidden overflow-ellipsis whitespace-nowrap"
        ref={textRef} 
      >
        {children}
      </div>
      {isOverflowing && (
        <CustomToolTip info={info}>
          <div className="absolute overflow-x-hidden overflow-ellipsis whitespace-nowrap">
            {children}
          </div>
        </CustomToolTip>
      )}
    </div>
  );
}
