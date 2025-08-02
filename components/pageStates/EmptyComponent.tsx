import BasicEmptyIcon from "@/components/Icons/states/BasicEmptyIcon";

export function EmptyComponent({ text }: { text?: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <BasicEmptyIcon />
      <p className="text-center text-2xl ">{text ? text : "Sin registros"}</p>
    </div>
  );
}
