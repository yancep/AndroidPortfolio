'use client';
import '@/globals.css';
import { HeroUIProvider } from "@heroui/react";
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: ReactNode }) {
  return (
      <HeroUIProvider locale="es-ES">
        <Toaster position="top-right" reverseOrder={false} />
        <div className="h-screen w-screen bg-background text-foreground light">
          {children}
        </div>
      </HeroUIProvider>
  );
}

