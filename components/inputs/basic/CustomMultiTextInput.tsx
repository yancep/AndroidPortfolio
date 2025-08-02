import { emailRegex } from '@/core/common/validations/regexs';
import { Input } from '@heroui/react';
import { FormikValues } from 'formik';
import React, { ReactNode, useRef, useState } from 'react';
import {
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaReddit,
  FaTelegram,
  FaTiktok,
  FaTwitter,
  FaYoutube
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

interface CustomMultiTextInputProps {
  form: FormikValues;
  formKey: string;
  label: string;
  placeholder?: string;
  isRequired: boolean;
  inputType?: 'text' | 'email' | 'phone' | 'url';
  value: string[];
  setFieldValue: (key: string, value: any) => void;
  renderItemPrefix?: (item: string) => ReactNode;
}

const getSocialMediaIcon = (url: string): ReactNode => {
  if (!url) return <FaGlobe size={16} />;
  
  try {
    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname.replace('www.', '').split('.')[0].toLowerCase();
    
    if (domain === 't' || domain === 'telegram' || domain === 'web.telegram') {
      return <FaTelegram size={16} color="#0088cc" />;
    }
    
    switch (domain) {
      case 'facebook':
        return <FaFacebook size={16} color="#1877F2" />;
      case 'twitter':
        return <FaTwitter size={16} color="#1DA1F2" />;
      case 'x':
        return <FaXTwitter size={16} color="#000000" />;
      case 'instagram':
        return <FaInstagram size={16} color="#E4405F" />;
      case 'linkedin':
        return <FaLinkedin size={16} color="#0A66C2" />;
      case 'youtube':
        return <FaYoutube size={16} color="#FF0000" />;
      case 'pinterest':
        return <FaPinterest size={16} color="#BD081C" />;
      case 'tiktok':
        return <FaTiktok size={16} color="#000000" />;
      case 'reddit':
        return <FaReddit size={16} color="#FF4500" />;
      default:
        return <FaGlobe size={16} color="#718096" />;
    }
  } catch (error) {
    if (url.includes('t.me') || url.includes('telegram')) {
      return <FaTelegram size={16} color="#0088cc" />;
    }
    return <FaGlobe size={16} color="#718096" />;
  }
};

const CustomMultiTextInput: React.FC<CustomMultiTextInputProps> = ({
  form,
  formKey,
  label,
  placeholder,
  isRequired,
  inputType = 'text',
  value,
  setFieldValue,
  renderItemPrefix,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [localError, setLocalError] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const validateInput = (input: string): boolean => {
    const trimmed = input.trim();
    if (!trimmed) return false;

    if (inputType === 'url') {
      try {
        new URL(trimmed);
        return true;
      } catch {
        if (trimmed.includes('t.me/') || trimmed.includes('telegram')) {
          return true;
        }
        return false;
      }
    }

    if (inputType === 'email') {
      return emailRegex.test(trimmed);
    }

    return trimmed !== '';
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = inputValue.trim();

      if (!trimmed) {
        setLocalError('No puede estar vacío');
        return;
      }

      if (!validateInput(trimmed)) {
        setLocalError(
          inputType === 'url'
            ? 'Por favor introduzca una URL válida'
            : inputType === 'email'
            ? 'Por favor introduzca un correo válido'
            : 'El valor introducido no es válido'
        );
        return;
      }

      setLocalError('');
      const newValue = [...(value || []), trimmed]; 
      setFieldValue(formKey, newValue);
      setInputValue('');
      inputRef.current?.focus();
    }
  };

  const removeItem = (indexToRemove: number) => {
    const newArray = value.filter((_, idx) => idx !== indexToRemove);
    setFieldValue(formKey, newArray);
  };

  const getItemPrefix = (item: string): ReactNode => {
    if (renderItemPrefix) {
      return renderItemPrefix(item);
    }
    
    if (inputType === 'url') {
      return getSocialMediaIcon(item);
    }
    
    return null;
  };

  return (
    <div className="flex flex-col w-full gap-1">
      <label
        htmlFor={formKey}
        className="flex flex-row items-center text-small text-foreground opacity-70"
      >
        {label}
        {isRequired && <span className="text-danger ml-1">*</span>}
      </label>

      <Input
        id={formKey}
        ref={inputRef}
        variant="bordered"
        size="md"
        radius="sm"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          if (localError) setLocalError('');
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.preventDefault();
        }}
        onKeyUp={handleKeyUp}
        placeholder={placeholder}
        type={inputType === 'phone' ? 'tel' : inputType}
        className="flex-grow"
        color={localError ? 'danger' : 'primary'}
        errorMessage={localError || undefined}
        isInvalid={!!localError}
      />

      {value && value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {value.map((item, index) => (
            <div
              key={index}
              className="bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full text-sm flex items-center group hover:bg-primary/20 transition-colors"
            >
              {getItemPrefix(item) && (
                <span className="mr-2 flex items-center">
                  {getItemPrefix(item)}
                </span>
              )}
              <span className="truncate max-w-xs">{item}</span>
              <button
                type="button"
                className="ml-2 h-5 w-5 rounded-full flex items-center justify-center bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                onClick={() => removeItem(index)}
                aria-label={`Eliminar ${item}`}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomMultiTextInput;