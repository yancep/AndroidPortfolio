import { Spacer, Spinner } from "@heroui/react";
import React from 'react';

export function LoadingComponent({ text, className }: { text: string, className?: string }) {
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center ${className ?? ""}`}>
      <Spinner />
      <Spacer y={1} />
      <p>{text}</p>
    </div>
  );
}
