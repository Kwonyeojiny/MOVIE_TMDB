import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface SignInputProps {
  label: string;
  type: string;
  id: string;
  autoComplete: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const SignInput: React.FC<SignInputProps> = ({
  label,
  type,
  id,
  register,
  error,
  autoComplete,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register}
        autoComplete={autoComplete}
        className={`w-full px-4 py-2 border-4 border-gray-200 border-l-gray-500 border-t-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 ${
          error ? 'border-red-500' : ''
        } `}
      />
      {error && <p className="text-red-500 mt-1 mb-4 text-sm">{error.message}</p>}
    </div>
  );
};

export default SignInput;
