 
 
import { showToast } from '@/components/toast/Toast';


/**
 * Extrae el ID de un elemento de una URL basada en el formato especificado.
 *
 * @param url - La URL de la que extraer el ID.
 * @returns El ID extraído o `null` si no se encuentra.
 */
export const extractIdFromUrl = ( url : string ) : string => {
  const regex = /\/([a-f0-9\-]{36})\//; // Busca un UUID en formato estándar.
  const match = url.match( regex );
  return match![ 1 ];
};


export const formatCurrency = ( amount : number ) => {
  return ( amount / 100 ).toLocaleString( 'en-US', {
	style : 'currency',
	currency : 'USD',
  } );
};

/**
 * Formatea un número con comas como separadores de miles y siempre muestra dos decimales.
 * @param num El número a formatear.
 * @returns El número formateado como string.
 */
export function formatNumber(
  number : number | string | null | undefined,
) : string {
  if ( !number && number !== 0 ) return '';
  const numStr = String( number ).trim();
  const numWithoutCommas = numStr.replace( /,/g, '' );
  
  return numWithoutCommas.replace( /\B(?=(\d{3})+(?!\d))/g, ',' );
}

export function formatNumberWithCommas( {
										  num,
										} : {
  num : number | null;
} ) : string {
  // Validar si el número es válido
  if ( num === null || isNaN( num ) ) return '';
  
  // Asegurar dos decimales y formatear con comas
  return num.toLocaleString( 'en-US', {
	minimumFractionDigits : 2,
	maximumFractionDigits : 2,
  } );
}

export function formatPhone( value : string | null ) {
  if ( value ) {
	return value.replace( /^(\d{1,4})(\d{3})(\d{4})$/, '$1 $2 $3' );
  }
}

export function formatBankAccount( value : string | null ) {
  if ( value ) {
	if ( value.length === 16 ) {
	  return value.replace( /(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4' );
	} else {
	  return value;
	}
  }
}

export function removeSpaces( value : string ) {
  return value.replace( /\s/g, '' );
}

export function removeCommas( value : string ) {
  return value.replace( /,/g, '' );
}

export function formatDateToSpanish( dateString : string | undefined ) : string {
  if ( dateString ) {
	const date = new Date( dateString + 'T00:00:00' ); // Ajuste de la zona horaria
	const opciones : Intl.DateTimeFormatOptions = {
	  day : '2-digit',
	  month : '2-digit',
	  year : 'numeric',
	};
	const formatoEspanol = new Intl.DateTimeFormat( 'es-ES', opciones );
	return formatoEspanol.format( date );
  } else {
	return '';
  }
}

// Formatea una fecha al formato DD/MM/YYYY
export const formatDateToSpanishFromDate = ( date : Date ) => {
  const day = String( date.getDate() ).padStart( 2, '0' );
  const month = String( date.getMonth() + 1 ).padStart( 2, '0' );
  const year = date.getFullYear();
  return `${ day }/${ month }/${ year }`;
};

export function formatDateForMonth( {
									  date : fechaString,
									  onlyMonth = false,
									} : {
  date : string;
  onlyMonth? : boolean;
} ) : string {
  const meses = [
	'Enero',
	'Febrero',
	'Marzo',
	'Abril',
	'Mayo',
	'Junio',
	'Julio',
	'Agosto',
	'Septiembre',
	'Octubre',
	'Noviembre',
	'Diciembre',
  ];
  
  // Corregir la interpretación de la fecha sin zona horaria
  const fecha = new Date( fechaString + 'T00:00:00' ); // Concatenar para asegurarse de que la hora sea 00:00:00 en la fecha
  
  // Verificar si la fecha es válida
  if ( isNaN( fecha.getTime() ) ) {
	return '';
  }
  
  // Establecer la hora a las 00:00 para evitar desplazamientos por la zona horaria
  fecha.setHours( 0, 0, 0, 0 );
  
  const mes = meses[ fecha.getMonth() ];
  const anio = fecha.getFullYear();
  
  if ( onlyMonth ) {
	return `${ mes }`;
  } else {
	return `${ mes }, ${ anio }`;
  }
}

export function CopyLink( text : string ) {
  navigator.clipboard.writeText( text ).then(
	function () {
	  showToast( 'Link copiado al portapapeles', 'success' );
	},
	function () {
	  console.log( 'Copy error' );
	},
  );
}

export const sanitizeValue = ( value : string | null ) : string | null => {
  return value === '' ? null : value;
};
