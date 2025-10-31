'use client';

import React from 'react';

interface TextAreaProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  rows?: number;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  rows = 4,
}) => {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-brand-text mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        className="w-full px-3 py-2 border border-brand-gray rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-brand-orange resize-vertical"
        style={{
          borderColor: error ? '#ef4444' : '#d1d5db',
        }}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
