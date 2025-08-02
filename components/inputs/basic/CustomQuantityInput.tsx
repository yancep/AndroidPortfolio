import { Amounts, ExpensePayload, FinancingPayload } from "@/features/economy/data/payloads/ExpensePayloads";
import { BaseItemNomenclature } from "@/features/shared/nomenclatures/domain/entities/BaseItemNomenclature";
import InfoIcon from '@/public/icons/InfoIcon';
import { Chip, Input, Select, SelectItem, Spacer, Tooltip } from "@heroui/react";
import { FormikValues } from 'formik';
import React, { useState } from 'react';

function isExpensePayload(item: ExpensePayload | FinancingPayload): item is ExpensePayload {
  return 'expense_element' in item;
}

type CustomQuantityInputProps = {
  form: FormikValues;
  data: ExpensePayload | FinancingPayload;
  formKey: string;
  units: BaseItemNomenclature[];
  label?: string;
  placeholder?: string;
  isRequired: boolean;
  maxLength?: number;
  textInfo?: string;
  startContent?: React.ReactNode | null;
};

export const CustomQuantityInput = ({
  form,
  formKey,
  units,
  data,
  label,
  placeholder,
  isRequired,
  maxLength,
  textInfo,
  startContent,
}: CustomQuantityInputProps) => {
  const [amount, setAmount] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<string>(units[0]?.url || "");
  const currentAmounts = data.amounts.filter(item => item) || [];

  const isExpense = isExpensePayload(data);
  const items = isExpense ? form.values.currentExpenses : form.values.currentFinancing;

  const getIdentifier = (item: ExpensePayload | FinancingPayload): string => {
    return isExpensePayload(item) ? item.expense_element : item.financing_source;
  };

  const handleCurrencyChange = (currencyCode: string) => {
    setSelectedCurrency(currencyCode);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['e', 'E', '+', '-'].includes(e.key)) {
      e.preventDefault();
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      addAmount();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[eE+-]/g, '');
    setAmount(value);
  };

  const addAmount = () => {
    if (!selectedCurrency || !amount) return;
    
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) return;

    const existingIndex = currentAmounts.findIndex(
      (amt: Amounts) => amt.currency === selectedCurrency);

    const newAmounts = [...currentAmounts];

    if (existingIndex >= 0) {
      newAmounts[existingIndex] = {
        currency: selectedCurrency,
        amount: numericAmount
      };
    } else {
      newAmounts.push({
        currency: selectedCurrency,
        amount: numericAmount
      });
    }

    const updated = items.map((item: ExpensePayload | FinancingPayload) =>
      getIdentifier(item) === getIdentifier(data)
        ? { ...item, amounts: newAmounts }
        : item
    );

    form.setFieldValue(formKey, updated);
    setAmount("");
  };

  const removeAmount = (currencyCode: string) => {
    const newAmounts = currentAmounts.filter(
      (amt: Amounts) => amt.currency !== currencyCode
    );

    const updated = items.map((item: ExpensePayload | FinancingPayload) =>
      getIdentifier(item) === getIdentifier(data)
        ? { ...item, amounts: newAmounts }
        : item
    );

    form.setFieldValue(formKey, updated);
  };

  const selectAmount = (currencyCode: string) => {
    const amountToEdit = currentAmounts.find(
      (amt: Amounts) => amt.currency === currencyCode
    );
    if (amountToEdit) {
      setSelectedCurrency(currencyCode);
      setAmount(amountToEdit.amount.toString());
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-row items-center text-small text-foreground opacity-70">
        {label && <span>{label}</span>}
        <Spacer />
        {textInfo && (
          <Tooltip
            classNames={{
              content: 'w-[300px] px-2 pt-2 text-justify',
            }}
            content={textInfo}
            placement="right"
          >
            <div>
              <InfoIcon />
            </div>
          </Tooltip>
        )}
      </div>

      <div className="flex gap-2">
        <Input
          type="number"
          variant="bordered"
          isInvalid={false}
          required={isRequired}
          size="md"
          maxLength={maxLength}
          placeholder={placeholder ?? '0'}
          value={amount}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          startContent={startContent}
          className="flex-1"
          min="0"
          step="any"
        />

        <Select
          selectedKeys={[selectedCurrency]}
          defaultSelectedKeys={selectedCurrency[0]}
          onChange={(e) => handleCurrencyChange(e.target.value)}
          className="w-20"
          variant="bordered"
        >
          {units.map((unit) => (
            <SelectItem key={unit.url}>
              {unit.code}
            </SelectItem>
          ))}
        </Select>
      </div>

      {currentAmounts.length > 0 && (
        <div className="mt-2 pb-1 flex flex-row overflow-auto">
          {currentAmounts.map((currencyCode: Amounts) => {
            return (
              <Chip
                key={`${currencyCode.currency}-${getIdentifier(data)}`}
                size="sm"
                color={selectedCurrency === currencyCode.currency ? "primary" : "default"}
                onClose={() => removeAmount(currencyCode.currency)}
                onClick={() => selectAmount(currencyCode.currency)}
                className="cursor-pointer transition-all gap-1"
              >
                {currencyCode.amount} {units.find(item => item.url === currencyCode.currency)?.code}
              </Chip>
            );
          })}
        </div>
      )}
    </div>
  );
};