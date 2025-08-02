'use client';
import { useEffect, useState } from 'react';
import { Divider } from "@heroui/react";

export const ValidatePass = ({ password }: { password: any }) => {
  const [isLengthValid, setLengthValid] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);

  useEffect(() => {
    setLengthValid(password.length >= 8);
    setHasNumber(/\d/.test(password));
    setHasLowerCase(/[a-z]/.test(password));
    setHasUpperCase(/[A-Z]/.test(password));
    setHasSymbol(/[^\w]/.test(password));
  }, [password]);

  const conditions = [
    isLengthValid,
    hasNumber,
    hasLowerCase,
    hasUpperCase,
    hasSymbol,
  ];

  const barsCondition = [
    {
      condition: isLengthValid,
      text: 'Al menos 8 caracteres',
    },
    {
      condition: hasNumber,
      text: 'Al menos un número',
    },
    {
      condition: hasLowerCase,
      text: 'Al menos una letra minúscula',
    },
    {
      condition: hasUpperCase,
      text: 'Al menos una letra mayúscula',
    },
    {
      condition: hasSymbol,
      text: 'Al menos un símbolo',
    },
  ];

  const validCount = conditions.filter((condition) => condition).length;

  return (
    <div style={{ width: 'full', display: 'flex', flexDirection: 'column' }}>
      {validCount == 5 ? (
        <></>
      ) : (
        <div className="flex flex-row justify-center">
          <Bars validCount={validCount} />
        </div>
      )}
      <div style={{ margin: 10 }}>
        <SuggestionLines
          barsCondition={barsCondition}
          conditions={conditions}
        />
      </div>
    </div>
  );
};

function SuggestionLines({
  barsCondition,
  conditions,
}: {
  barsCondition: any[];
  conditions: boolean[];
}) {
  const suggestionLines = conditions.map((condition, index) => (
    <div
      key={index}
      className={`text-small text-${condition ? 'success' : 'danger'}`}
    >
      <div className="flex flex-row items-center">
        {condition ? <></> : <>{barsCondition[index].text}</>}
      </div>
    </div>
  ));

  return suggestionLines;
}

function Bars({ validCount }: { validCount: number }) {
  const bars = Array.from({ length: 5 }, (_, index) => (
    <Divider
      key={index}
      style={{
        margin: 4,
        height: 4,
        width: 80,
        borderRadius: 20,
      }}
      className={`bg-${index < validCount ? 'success' : 'default-200'}`}
    />
  ));

  return bars;
}
