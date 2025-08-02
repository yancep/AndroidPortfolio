import React, { useState, useEffect, useRef } from 'react';
import { FormikValues } from 'formik';
import { Input } from '@heroui/react';

interface CustomFileInputProps {
  form: FormikValues;
  formKey: string;
  label: string;
  placeholder: string;
  isRequired: boolean;
  accept: string;
  disabled?: boolean;
  extended?: boolean;
}

const CustomFileInput = ({
  form,
  formKey,
  label,
  placeholder,
  isRequired,
  accept,
  disabled,
  extended = true,
} : CustomFileInputProps) => {
  const [fileName, setFileName] = useState<string>('');
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    setFileName(file.name);
    if (extended && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
    form.setFieldValue(formKey, file);
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files[0];
      await processFile(file);
    }
  };

  const triggerFileInput = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragActive(true);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (disabled) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      await processFile(file);
      e.dataTransfer.clearData();
    }
  };

  const clearFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFileName('');
    setPreviewUrl(null);
    form.setFieldValue(formKey, null);
    // Reinicia el valor del input para poder seleccionar el mismo archivo nuevamente
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex w-full flex-col gap-1">
      <label htmlFor={formKey} className="flex flex-row items-center text-small text-foreground opacity-70">
        {label} {isRequired && <span className="text-danger ml-1">*</span>}
      </label>

      {extended ? (
        <div
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`cursor-pointer transition-colors flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-md ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
          } hover:border-gray-400 focus-within:border-blue-500`}
          role="button"
          aria-label="Seleccionar archivo"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') triggerFileInput();
          }}
        >
          <Input
            ref={fileInputRef}
            id={formKey}
            type="file"
            accept={accept}
            onChange={handleChange}
            disabled={disabled}
            className="hidden"
          />
          {previewUrl ? (
            <div className="w-full flex flex-col items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full">
                <img src={previewUrl} alt="Vista previa" className="w-full h-auto object-contain rounded max-h-40" />
                <button
                  type="button"
                  onClick={clearFile}
                  className="absolute top-[-12px] right-[-12px] m-1 bg-red-300 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-400 transition-colors"
                  aria-label="Eliminar imagen"
                >
                  X
                </button>
              </div>
              
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-600 text-center">{placeholder}</span>
            </div>
          )}
        </div>
      ) : (
        <>
          {fileName ? (
            <div
              className={`cursor-pointer transition-colors flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-md relative ${
                isDragActive ? 'border-gray-500 bg-blue-50' : 'border-gray-300 bg-white'
              } hover:border-gray-400 focus-within:border-gray-500`}
              onClick={triggerFileInput}
            >
              <span className="text-sm text-gray-700 flex-1 truncate flex">{fileName}</span>
              <button type="button" onClick={clearFile} className="absolute right-4 bg-red-300 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-400 transition-colors">
                X
              </button>
            </div>
          ) : (
            <div
              onClick={triggerFileInput}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`cursor-pointer transition-colors flex flex-col items-center justify-center w-full p-2 border-2 border-dashed rounded-md ${
                isDragActive ? 'border-gray-500 bg-blue-50' : 'border-gray-300 bg-white'
              } hover:border-gray-400 focus-within:border-gray-500`}
              role="button"
              aria-label="Seleccionar archivo"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') triggerFileInput();
              }}
            >
              <Input
                ref={fileInputRef}
                id={formKey}
                type="file"
                accept={accept}
                onChange={handleChange}
                disabled={disabled}
                className="hidden"
              />
              <span className="text-sm font-medium text-gray-600 text-center">{placeholder}</span>
            </div>
          )}
        </>
      )}

      {form.touched[formKey] && form.errors[formKey] && (
        <p className="text-xs text-danger-50 mt-1">{form.errors[formKey]}</p>
      )}
    </div>
  );
};

export default CustomFileInput;