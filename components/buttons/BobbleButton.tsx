'use client';

import { ReactNode, useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { CardContent } from '@mui/material';
import { Card, CardHeader } from '@heroui/react';
import { LuArchiveRestore } from 'react-icons/lu';

interface BobbleButtonProps {
  // Contenido a mostrar en el Card
  children: ReactNode;
  header: ReactNode;
}

export default function BobbleButton({ children, header }: BobbleButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Función para alternar el estado expandido
  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  // Estilos condicionales
  const buttonStyle = isExpanded
    ? 'translate-x-0 -right-2 relative mt-1  text-danger text-lg'
    : 'translate-x-[350px] right-0  text-primary text-lg'; // Mueve el botón hacia la izquierda 350px

  const cardStyle = isExpanded
    ? 'translate-x-0 mb-1 mr-1 mt-1'
    : 'translate-x-full'; // Desplaza la carta hacia la derecha

  return (
    <div
      className={`absolute right-0 top-1/4 flex overflow-hidden transition-all duration-300 bg-transparent ease-in-out ${isExpanded ? 'rounded-lg' : ''}`}
    >
      <div
        className={`flex h-10 w-12 cursor-pointer items-center justify-center rounded-l-full bg-default shadow-lg transition-transform duration-300 ease-in-out ${buttonStyle}`}
        onClick={toggleExpand}
      >
        {isExpanded ? <IoIosCloseCircleOutline /> : <LuArchiveRestore />}
      </div>
      <Card
        className={`max-h-[600] w-[350px] rounded-tl-[0px] transition-transform duration-300 ease-in-out ${cardStyle}`}
      >
        <CardHeader className="text-lg font-bold flex justify-center ">{header}</CardHeader>
        <CardContent className="overflow-y-auto  py-0">{children}</CardContent>
      </Card>
    </div>
  );
}
