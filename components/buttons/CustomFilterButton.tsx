import { CustomButton } from '@/components/buttons/CustomButton';
import { ColumnIcon, FilterIcon } from '@/components/Icons/extra/TableIcons';
import {
  Badge,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spacer,
} from "@heroui/react";
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';

export type PopoverPlacement =
  | 'top'
  | 'bottom'
  | 'right'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end';

export default function CustomFilterButton({
  header,
  children,
  confirmFilter,
  cancelFilter,
  styles,
  filter = true,
  numFilters,
  realNumFilters,
  setNumFilters
}: {
  confirmFilter?: () => void;
  cancelFilter?: () => void;
  header: (isOpen: boolean) => ReactNode;
  children: ReactNode;
  styles?: {
    popoverPosition: PopoverPlacement;
    buttonWidth?: string;
  };
  filter?: boolean;
  realNumFilters: number;
  numFilters: number;
  setNumFilters: Dispatch<SetStateAction<number>>
}) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const [hasAppliedFilters, setHasAppliedFilters] = useState(false);

  return (
    <Badge 
      color="default"  
      content={realNumFilters} 
      isInvisible={!hasAppliedFilters || realNumFilters === 0} 
      shape="circle"
    >
      <Popover
        placement={styles?.popoverPosition ?? 'bottom-end'}
        isDismissable={false}
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(!isOpen)}
        offset={5}
      >
        <PopoverTrigger>
          <Button
            startContent={filter ? <FilterIcon /> : <ColumnIcon />}
            variant="bordered"
            color="default"
            className={styles?.buttonWidth ? styles.buttonWidth : ""}
            isIconOnly={!!styles?.buttonWidth}
            style={{ zIndex: 0 }}
          >
            {!styles?.buttonWidth && header(isOpen)}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div
            style={{
              maxWidth: 400,
              minWidth: 300,
            }}
            className="flex w-full flex-col px-1 py-2"
          >
            <div className={'flex justify-end'}>
            </div>
            <Spacer />
            {children}
            <Spacer y={2} />
            <div className="flex flex-row justify-end">
              <CustomButton
                size={'md'}
                title={'Limpiar'}
                variant={'bordered'}
                color={'default'}
                onClick={() => {
                  setHasAppliedFilters(false);
                  setNumFilters(numFilters)
                  if (cancelFilter) cancelFilter();
                  onClose();
                }}
              />
              <Spacer />
              {confirmFilter && (
                <CustomButton
                  size={'md'}
                  onClick={() => {
                    onClose();
                    if (numFilters > 0) {
                      setHasAppliedFilters(true);
                      setNumFilters(numFilters)
                    } else {
                      setHasAppliedFilters(false);
                    }
                    confirmFilter();
                  }}
                  title={'Aplicar'}
                  variant={'solid'}
                  color={'primary'}
                />
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </Badge>
  );
}