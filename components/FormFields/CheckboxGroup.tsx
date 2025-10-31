'use client';

import React, { useState } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

interface CheckboxOption {
  value: string;
  label: string;
  allowsOther?: boolean;
}

interface CheckboxGroupProps {
  label: string;
  options: CheckboxOption[];
  value: string[];
  onChange: (values: string[]) => void;
  otherText?: string;
  onOtherTextChange?: (text: string) => void;
  error?: string;
  required?: boolean;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  options,
  value,
  onChange,
  otherText = '',
  onOtherTextChange,
  error,
  required = false,
}) => {
  const [showOtherInput, setShowOtherInput] = useState(
    value.includes('other')
  );

  const handleCheckChange = (optionValue: string, checked: boolean) => {
    let newValues: string[];
    if (checked) {
      newValues = [...value, optionValue];
      if (optionValue === 'other') {
        setShowOtherInput(true);
      }
    } else {
      newValues = value.filter((v) => v !== optionValue);
      if (optionValue === 'other') {
        setShowOtherInput(false);
        if (onOtherTextChange) {
          onOtherTextChange('');
        }
      }
    }
    onChange(newValues);
  };

  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-brand-text mb-3">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <div key={option.value}>
            <div className="flex items-center gap-2">
              <CheckboxPrimitive.Root
                checked={value.includes(option.value)}
                onCheckedChange={(checked) =>
                  handleCheckChange(option.value, checked === true)
                }
                id={`checkbox-${option.value}`}
                className="w-4 h-4 border-2 border-brand-gray rounded cursor-pointer hover:border-brand-orange focus:outline-none focus:ring-2 focus:ring-orange-300"
                style={{
                  backgroundColor: value.includes(option.value) ? '#ff8c42' : 'white',
                  borderColor: value.includes(option.value) ? '#ff8c42' : '#d1d5db',
                }}
              >
                <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
                  <Check size={14} />
                </CheckboxPrimitive.Indicator>
              </CheckboxPrimitive.Root>
              <label
                htmlFor={`checkbox-${option.value}`}
                className="text-sm text-brand-text cursor-pointer hover:text-brand-gray-text transition-colors"
              >
                {option.label}
              </label>
            </div>

            {option.allowsOther && showOtherInput && value.includes(option.value) && (
              <div className="ml-6 mt-2">
                <input
                  type="text"
                  placeholder="Please specify..."
                  value={otherText}
                  onChange={(e) => onOtherTextChange?.(e.target.value)}
                  maxLength={100}
                  className="w-full px-3 py-2 border border-brand-gray rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-brand-orange"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
};
