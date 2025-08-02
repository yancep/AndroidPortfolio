import { Spacer } from "@heroui/react";
import { ErrorIcon } from 'react-hot-toast';

export default function ErrorComponent({
  errorTitle,
  errorSubtitle,
}: {
  errorTitle: string;
  errorSubtitle?: string | null;
}) {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="flex flex-col items-center">
        <ErrorIcon />
        <Spacer y={1} />
        <span style={{ fontSize: 20 }} className="font-semibold">
          {errorTitle}
        </span>
        {errorSubtitle && (
          <>
            <Spacer y={1} />
            <span className="text-default-500">{errorSubtitle}</span>
          </>
        )}
      </div>
    </div>
  );
}
