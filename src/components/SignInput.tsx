import React from 'react';

interface SignInputProps {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

const SignInput: React.FC<SignInputProps> = ({
  label,
  type,
  id,
  value,
  onChange,
  required = false,
  className = '',
}) => {
  return (
    <>
      <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-2 border-4 border-gray-200 border-l-gray-500 border-t-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 ${className} mb-4`}
      />
    </>
  );
};

export default SignInput;
