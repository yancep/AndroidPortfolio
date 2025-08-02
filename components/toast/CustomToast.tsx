import toast from 'react-hot-toast';
import React, { ReactNode } from 'react';
import { Progress, Spacer } from "@heroui/react"; // Ensure you have this import if using NextUI

export const CustomToast = ({ content }: { content: ReactNode }) => {
  return toast.custom(
    (t: any) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } pointer-events-auto flex w-full max-w-md flex-row rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex w-0 flex-1 flex-col p-4">
          {content}
          <Spacer />
          <ProgressBar max={6000} />
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-default-600 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Close
          </button>
        </div>
      </div>
    ),
    {
      duration: 5900, // Duration for the toast
    },
  );
};

function ProgressBar({ max }: { max: number }) {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const totalDuration = max; // Use max as total duration in milliseconds
    const intervalTime = totalDuration / 100; // Update every x milliseconds for 100 steps

    const interval = setInterval(() => {
      setValue((v) => {
        if (v >= 100) {
          clearInterval(interval); // Stop the interval when reaching 100%
          return 100; // Ensure it stays at 100%
        }
        return v + 1; // Increment by 1%
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [max]);

  return value < 100 ? (
    <Progress size="sm" value={value} color="default" className="w-full" />
  ) : null;
}
