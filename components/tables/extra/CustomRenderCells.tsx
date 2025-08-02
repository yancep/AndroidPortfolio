import { formatBankAccount } from "@/components/inputs/customs/CustomBankAcountInput";
import { formatPhone } from "@/components/inputs/customs/CustomPhoneInput";
import { Activity } from "@/features/acti/domain/entities/Activity";
import { EspecializedProduction } from "@/features/acti/domain/entities/EspecializedProduction";
import {
  ProjectType
} from "@/features/acti/domain/entities/Project";
import { ScienceService } from "@/features/acti/domain/entities/ScienceService";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { ChevronDownIcon } from "@heroui/shared-icons";

export const NOT_SPECIFIED_FIELD = "No especificado";

export function RenderPhone({ phone }: { phone: string | null | undefined }) {
  return <>{phone ? formatPhone(phone) : NOT_SPECIFIED_FIELD}</>;
}

export function RenderWebSite({ web }: { web: string | null | undefined }) {
  return <>{web ? web : NOT_SPECIFIED_FIELD}</>;
}

export function RenderBankAccount({
  bankAccount,
}: {
  bankAccount: string | null | undefined;
}) {
  return (
    <>{bankAccount ? formatBankAccount(bankAccount) : NOT_SPECIFIED_FIELD}</>
  );
}

export function RenderWage({ wage }: { wage: string | null | undefined }) {
  return <>{wage ? formatNumber(wage) : NOT_SPECIFIED_FIELD}</>;
}

export function formatNumber(
  number: number | string | null | undefined
): string {
  if (!number && number !== 0) return "0.00";

  const numStr = String(number).trim();
  const numWithoutCommas = numStr.replace(/,/g, "");

  // Separar la parte entera y la parte decimal
  let [integerPart, decimalPart] = numWithoutCommas.split(".");

  // Tratar los casos en los que no haya parte decimal
  if (!decimalPart) {
    decimalPart = "00"; // Agregar .00 si no hay parte decimal
  } else {
    decimalPart = decimalPart.slice(0, 2); // Truncar la parte decimal a dos dígitos
  }

  // Formatear la parte entera con separadores de miles
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Unir la parte entera y la parte decimal
  return `${integerPart}.${decimalPart}`;
}

export function RenderValuesName(
  name: string | null | undefined,
  key?: string
) {
  return <span key={key}>{name ?? NOT_SPECIFIED_FIELD}</span>;
}

export function RenderUnitValue(
  value: string,
  unit: string,
  key?: string
) {
  return <span key={key}>{value + unit}</span>;
}

export function RenderValueOrNull({
  value,
}: {
  value: string | number | null;
}) {
  return <span>{!value ? " - " : value}</span>;
}

export function RenderDestinoCell({
  item,
}: {
  item: EspecializedProduction | Activity | ScienceService
}) {
  const bgColor =
    item.purpose == "Exportación" 
      ? "bg-[#0A27591A]" 
      : item.purpose == "Ambas"
        ? "bg-[#F0F0F0]"
        : "bg-[#E6F4F1]";
        
  const textColor =
    item.purpose == "Exportación" 
      ? "text-[#0A2759]" 
      : item.purpose == "Ambas"
        ? "text-[#666666]"
        : "text-[#1A7F6A]";

  return (
    <div className="flex items-center justify-left">
      <span
        className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium ${bgColor} ${textColor}`}
      >
        {item.purpose == "Exportación"
          ? "Exportación"
          : item.purpose == "Ambas"
            ? "Expor/SI"
            : "Sustitución de importaciones"}
      </span>
    </div>
  );
}

export function RenderPurposeCell(purpose: string) {
  const text =
    purpose === "EXPORTATION"
      ? "Exportación"
      : purpose === "IMPORT_SUBSTITUTION"
        ? "Sustitución de importaciones"
        : purpose === "EXPORTATION_AND_IMPORT_SUBSTITUTION"
          ? "Expor/ SI"
          : "No Especificado";

  const bgColor =
    purpose === "EXPORTATION"
      ? "bg-[#E6EAF0]"
      : purpose === "IMPORT_SUBSTITUTION"
        ? "bg-[#DDF3EE]"
        : purpose === "EXPORTATION_AND_IMPORT_SUBSTITUTION"
          ? "bg-[#FEEED9]"
          : "bg-gray-200";

  const textColor =
    purpose === "EXPORTATION"
      ? "text-[#0A2759]"
      : purpose === "IMPORT_SUBSTITUTION"
        ? "text-[#1A7F6A]"
        : purpose === "EXPORTATION_AND_IMPORT_SUBSTITUTION"
          ? "text-[#C17A00]"
          : "text-gray-700";

  return (
    <span
      className={`inline-flex whitespace-nowrap items-center justify-center rounded-full px-3 py-1 text-sm font-medium ${bgColor} ${textColor}`}
    >
      {text}
    </span>
  );
}


export function RenderTipoCell({
  type,
}: {
  type: ProjectType | undefined | null;
}) {
  const text =
    type === "BASIC_RESEARCH"
      ? "Investigación básica"
      : type === "APPLIED_RESEARCH"
        ? "Investigación aplicada"
        : type === "EXPERIMENTAL_DEVELOPMENT"
          ? "Desarrollo experimental"
          : type === "INNOVATION"
            ? "Innovación"
            : NOT_SPECIFIED_FIELD;
  const bgColor =
    type === "BASIC_RESEARCH"
      ? "bg-[#E3F2FD]"
      : type === "APPLIED_RESEARCH"
        ? "bg-[#FFF3E0]"
        : type === "EXPERIMENTAL_DEVELOPMENT"
          ? "bg-[#E8F5E9]"
          : type === "INNOVATION"
            ? "bg-[#FBE9E7]"
            : "bg-[#F3E5F5]";
  const textColor =
    type === "BASIC_RESEARCH"
      ? "text-[#1565C0]"
      : type === "APPLIED_RESEARCH"
        ? "text-[#EF6C00]"
        : type === "EXPERIMENTAL_DEVELOPMENT"
          ? "text-[#2E7D32]"
          : type === "INNOVATION"
            ? "text-[#D84315]"
            : "text-[#6A1B9A]";

  if (!type) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium bg-gray-100 text-gray-500`}
      >
        {NOT_SPECIFIED_FIELD}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium ${bgColor} ${textColor}`}
    >
      {text}
    </span>
  );
}

interface Entity {
  url: string;
  name: string;
}

type EntityWithUrlName = {
  entityUrl: {
    name: string;
  };
};

type AcceptedEntities = Entity | EntityWithUrlName;

export const RenderMultipleEntities = ({ 
  entities 
}: { 
  entities: Array<AcceptedEntities>
}) => {
  const getName = (entity: AcceptedEntities): string => {
    if ('entityUrl' in entity) {
      return entity.entityUrl.name || 'N/A';
    } else if ('name' in entity) {
      return entity.name || 'N/A';
    }
    return 'N/A';
  };

  const firstEntityName = entities.length > 0 ? getName(entities[0]) : 'N/A';
  const remainingCount = entities.length - 1;

  if (entities.length === 0) {
    return RenderValuesName('N/A');
  }

  if (entities.length === 1) {
    return RenderValuesName(firstEntityName);
  }

  return (
    <div className="flex items-center gap-1 group">
      {RenderValuesName(firstEntityName)}
      <Popover placement="bottom" triggerScaleOnOpen={false}>
        <PopoverTrigger>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            className="h-5 w-5 p-0 min-w-0 text-default-400 group-hover:text-default-600 transition-colors"
            aria-label="Ver más entidades"
          >
            <ChevronDownIcon className="w-3 h-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-2 max-w-[250px]">
          <div className="space-y-1">
            {entities.map((entity, index) => (
              <div 
                key={index} 
                className="text-sm px-2 py-1 rounded hover:bg-default-100"
              >
                {getName(entity)}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};