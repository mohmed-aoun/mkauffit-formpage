'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectDropdownProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  placeholder = 'Select an option',
}) => {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-brand-text mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className="w-full px-3 py-2 border border-brand-gray rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-brand-orange appearance-none bg-white pr-8"
          style={{
            borderColor: error ? '#ef4444' : '#d1d5db',
          }}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-2 top-2.5 pointer-events-none text-gray-400">
          <ChevronDown size={18} />
        </div>
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
