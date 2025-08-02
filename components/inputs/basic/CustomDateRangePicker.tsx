// import React from 'react';
// import { FormikValues } from 'formik';
// import { Data } from '@heroui/react';
//
// /**
//  * @description Componente CustomTextArea para renderizar un textarea estilizado con integración Formik.
//  * @param {CustomTextAreaProps} props - Props para el componente CustomTextArea.
//  * @returns {JSX.Element} Componente de textarea con estilo personalizado e integración Formik.
//  */
// const CustomDateRangePicker = ({
//   form,
//   initialKey,
//   finalKey,
//   maxDate,
//   minDate,
//   defaultValues,
// }: {
//   form: FormikValues; // Valores del formulario Formik
//   initialKey: string; // Valor de la clave inicial
//   finalKey: string; // Valor de la clave final
//   defaultValues?: {
//     initial: string;
//     final: string;
//   };
//   maxDate?: string; // Fecha máxima
//   minDate?: string; // Fecha mínima
// }) => {
//   return (
//     <div className="flex w-full flex-col">
//       <div className="flex w-full max-w-xl flex-row gap-4">
//         <div className="flex w-full flex-col gap-1">
//           <h3>Fecha de inicio</h3>
//           <DatePicker
//             label="Date and time"
//             defaultValue={defaultValues?.initial}
//             radius={'sm'}
//             id={initialKey}
//             size="sm"
//             onBlur={form.handleBlur}
//             color={
//               form.touched[initialKey] && form.errors[initialKey]
//                 ? 'danger'
//                 : 'primary'
//             }
//             errorMessage={
//               form.touched[initialKey] && form.errors[initialKey]
//                 ? form.errors[initialKey]?.toString()
//                 : undefined
//             }
//             onChange={(e) => {
//               form.handleChange(e);
//             }}
//             value={form.values[initialKey]}
//           />
//         </div>
//         <div className="flex w-full flex-col gap-1">
//           <h3>Fecha de fin</h3>
//           <DatePicker
//             label="Date and time"
//             defaultValue={defaultValues?.final}
//             className="max-w-[284px]"
//             isDisabled
//             onFocus={() => form.setFieldTouched(finalKey)}
//             radius={'sm'}
//             id={finalKey}
//             size="sm"
//             onBlur={form.handleBlur}
//             color={
//               form.touched[finalKey] && form.errors[finalKey]
//                 ? 'danger'
//                 : 'primary'
//             }
//             errorMessage={
//               form.touched[finalKey] && form.errors[finalKey]
//                 ? form.errors[finalKey]?.toString()
//                 : undefined
//             }
//             onChange={(e) => {
//               form.handleChange(e);
//             }}
//             value={form.values[finalKey]}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default CustomDateRangePicker;
