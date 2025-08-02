'use client';
import Background from '@/features/authentication/ui/components/Background';
import { LoginForm } from '@/features/authentication/ui/components/LoginForm';
import LogoAndText from '@/features/authentication/ui/components/LogoAndText';
import { Card, CardBody, CardHeader } from "@heroui/react";

export default function LoginView() {
  return (
    <div className="m-0 flex h-full w-full items-center justify-center p-0">
      <Background />
      <Card className="absolute" style={{ width: 500, padding: 10}}>
        <CardHeader className="flex flex-col justify-center">
          <LogoAndText />
        </CardHeader>
        <CardBody>
          <LoginForm />
        </CardBody>
      </Card>
    </div>
  );
}
