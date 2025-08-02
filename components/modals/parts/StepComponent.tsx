import { Avatar, Divider, Spacer, User } from "@heroui/react";

export interface Step {
  id: number;
  label?: string;
  description?: string;
  divider?: boolean;
}

export function StepsComponent({
  steps,
  currentStep,
  gotToStep,
}: {
  steps: Step[];
  currentStep: number;
  gotToStep?: (n: number) => void;
}) {
  return (
    <div className="flex w-full flex-row items-center justify-center overflow-x-auto">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="flex items-center justify-center text-center"
        >
          <div className="flex flex-col items-center justify-center text-tiny">
            <Avatar
              color={step.id <= currentStep ? "primary" : "default"}
              name={`${step.id + 1}`}
              onClick={gotToStep ? () => gotToStep(index) : () => {}}
            />
            <Spacer />
            <h1>{step.label}</h1>
          </div>
          {step.divider && (
            <Divider
              style={{
                marginBottom: 15,
                marginRight: 15,
                marginLeft: step.id === 1 ? 15 : 0,
                width: 90,
                background: step.id < currentStep ? "var(--primary)" : "var(--default-200)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function StepsVerticalComponent({
  steps,
  currentStep,
}: {
  steps: Step[];
  currentStep: number;
}) {
  return (
    <section className="h-full w-full overflow-y-auto p-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-start">
          <div className="flex items-start gap-3 w-full relative">
            <div className="flex-shrink-0 z-10 ml-4 mt-4">
              <User
                name=""
                description=""
                avatarProps={{
                  className: "h-9 w-9 text-md",
                  color: index <= currentStep ? "primary" : "default",
                  showFallback: true,
                  fallback: index + 1,
                }}
              />
            </div>

            <div className="flex-1 min-w-0 pt-1">
              <User
                name={<span className="text-medium line-clamp-2">{step.label}</span>}
                description={<span className="text-xs line-clamp-2">{step.description}</span>}
                avatarProps={{ className: "hidden" }}
              />
            </div>

            {step.divider && (
              <div 
                className={`absolute left-[34px] top-[46px] w-px h-[30px] ${
                  index < currentStep ? "bg-primary" : "bg-default-200"
                }`}
              />
            )}
          </div>
        </div>
      ))}
    </section>
  );
}