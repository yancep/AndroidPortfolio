import { AxiosError } from 'axios';

interface CustomError {
  code : string[];
  detail : string;
  name?: string[];
  email?: string[];
  __general__?: string[];
}

export function handleError( axiosError : AxiosError ) : string {
  if ( axiosError.response?.data ) {
	const myError : CustomError = axiosError.response?.data as CustomError;
	if(!myError.detail){
		if(axiosError?.response?.data == "Already exists a general manager in the given entity.")
			return "Ya existe un director general en la entidad dada";
		if(axiosError?.response?.data == "The entity is already associated")
			return "La entidad ya se encuentra asociada";
		if(axiosError?.response?.data == "You cannot associate your own entity")
			return "No puedes seleccionar tu propia entidad";
		if(myError.name)
			if(myError.name[0] == "The name already exists")
				return "Ya existe un programa con ese nombre";
		if(myError.code){
			if(myError.code[0] == "Ya existe PlanPrograma con este code.")
				return "Ya existe un programa con ese código";
			if(myError.code[0] != "")
				return myError.code[0];
		}
		if(myError.__general__ ){
			if (myError.__general__[0] == "Los campos title, entity_science_plan deben formar un conjunto único.")
				return "El campo título debe ser único"
			if (myError.__general__[0] == "The reporting entity must be within the sending or receiving entities.")
				return "La entidad reportante debe estar dentro de las entidades emisoras o receptoras"
			if (myError.__general__[0] == "Sending entities and Receiving entities contain a common entity.")
				return "Las entidades de emisoras y las entidades de receptoras contienen una entidad común"
			if (myError.__general__[0] == "There is already a science plan for that year.")
				return "Ya existe un plan para ese año"
			if (myError.__general__[0] == "Start date cannot be later than end date.")
				return "La fecha de inicio no pude ser superior a la fecha final"
			if (myError.__general__[0] == "Expense list cannot be empty.")
				return "Debe que registrar algún gasto"
			if (myError.__general__[0] == "The total amount from the financing sources must be equal to the total amount of the expenses.")
				return "El monto total de las fuentes de financiamiento debe ser igual al monto total de los gastos"
		}
		if(myError.email)
			if(myError.email[0] == "Ya existe Entity Management Member con este email.")
				return "Ya existe un miembro con ese correo en la entidad"
			if(myError.email![0] != "")
				return myError.email![0];
	}
	if(myError.detail)
		if(myError.detail == "No PlannedProject matches the given query.")
			return "No se encontró ningún proyecto planificado que coincida con la búsqueda"
		return myError.detail;
  } else if ( axiosError.code === 'ECONNABORTED' ) {
	return 'La solicitud ha caducado. Por favor, inténtelo de nuevo más tarde.';
  } else if ( !axiosError.response ) {
	return 'Error de red. Por favor, verifique su conexión a internet.';
  } 
	const status = axiosError.response.status;
	switch (status) {
	  case 400:
		return 'Solicitud incorrecta. Por favor, verifique los parámetros de su solicitud.';
	  case 401:
		return 'No autorizado. Por favor, inicie sesión de nuevo.';
	  case 403:
		return 'Prohibido. No tiene permiso para acceder a este recurso.';
	  case 404:
		return 'Recurso no encontrado.';
	  case 500:
		return 'Error interno del servidor. Por favor, inténtelo de nuevo más tarde.';
	  default:
		return `Se ha producido un error con el código de estado: ${ status }`;
	}
}