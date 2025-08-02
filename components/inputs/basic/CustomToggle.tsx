import { Switch } from "@heroui/react";
import { FormikValues } from 'formik';
import React from 'react';

interface CustomToggleProps {
  form : FormikValues;
  formKey : string;
  label : string;
  isRequired : boolean;
  checked : boolean;
  onChange? : ( checked : boolean ) => void;
  isDisable? : boolean;
}

const CustomToggle : React.FC<CustomToggleProps> = ( {
													   form,
													   formKey,
													   label,
													   isRequired,
													   checked,
													   onChange,
													   isDisable = false,
													 } ) => {
  return (
	<div className="flex w-full flex-col ">
	  <label
		htmlFor={ formKey }
		className="flex flex-row text-small text-foreground opacity-70"
	  >
		<Switch
		  id={ formKey }
		  checked={ checked }
		  onChange={ ( e ) => {
			form.setFieldValue( formKey, e.target.checked );
			if ( onChange ) onChange( e.target.checked );
		  } }
		  isDisabled={ isDisable }
		/>
		{ label }
		{ isRequired && <div className="text-danger">*</div> }
	  </label>
	</div>
  );
};

export default CustomToggle;
