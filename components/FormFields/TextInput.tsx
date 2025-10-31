'use client';

import React from 'react';

interface TextInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  type?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  type = 'text',
}) => {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-brand-text mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full px-3 py-2 border border-brand-gray rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-brand-orange"
        style={{
          borderColor: error ? '#ef4444' : '#d1d5db',
        }}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
