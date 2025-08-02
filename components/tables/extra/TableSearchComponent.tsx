import { CustomButton } from '@/components/buttons/CustomButton';
import { SearchState } from '@/components/tables/CustomTable';
import { Input, Spinner } from "@heroui/react";
import debounce from 'lodash/debounce';
import { ReactNode, useCallback, useState } from 'react';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';

export const changeLoadingSearchState = (state: SearchState): SearchState => {
  return {
    ...state,
    isLoading: !state.isLoading,
  };
};

export const changeValueSearchState = (
  state: SearchState,
  value: string,
): SearchState => {
  return {
    ...state,
    value: value,
  };
};

export default function TableSearchComponent({
  changeValueSearchState,
  isLoading,
  topContent,
}: {
  changeValueSearchState: (value: string) => void;
  isLoading: boolean;
  topContent?: ReactNode;
}) {
  const [inputValue, setInputValue] = useState<string>(''); 

  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => {
      changeValueSearchState(value);
    }, 300),
    [changeValueSearchState] 
  );

  const onInputChange = (newInputValue: string) => {
    setInputValue(newInputValue);
    debouncedSetSearchTerm(newInputValue);
  };

  return (
    <section className='flex flex-row w-full'>
      <div className={'flex flex-1 flex-row justify-between'}>
        <Input
          startContent={<AiOutlineSearch />}
          size={'md'}
          variant={'bordered'}
          endContent={
            <div className="flex flex-row">
              {inputValue && ( 
                <CustomButton
                  isIconOnly
                  size={'sm'}
                  variant="light"
                  color={'default'}
                  radius="full"
                  icon={<AiOutlineClose />}
                  onClick={() => {
                    changeValueSearchState('');
                    setInputValue('');
                  }}
                />
              )}
              {isLoading && <Spinner size={'sm'} />}
            </div>
          }
          value={inputValue}
          placeholder={'Buscar por nombre'}
          onChange={(e) => onInputChange(e.target.value)}
          color={'default'}
        />
      </div>
      <div className={'flex flex-1'}></div>
      <div className={'flex flex-1 flex-row justify-end'}>
        {<div>{topContent}</div>}
      </div>
    </section>
  );
}
