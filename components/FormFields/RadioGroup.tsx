'use client';

import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  layout?: 'vertical' | 'horizontal';
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  required = false,
  layout = 'vertical',
}) => {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-brand-text mb-3">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <RadioGroupPrimitive.Root
        value={value}
        onValueChange={onChange}
        className={`flex ${layout === 'horizontal' ? 'gap-6' : 'flex-col gap-3'}`}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <RadioGroupPrimitive.Item
              value={option.value}
              id={`radio-${option.value}`}
              className="w-4 h-4 border-2 border-brand-gray rounded-full cursor-pointer hover:border-brand-orange focus:outline-none focus:ring-2 focus:ring-orange-300"
              style={{
                borderColor: value === option.value ? '#ff8c42' : '#d1d5db',
                backgroundColor: value === option.value ? '#ff8c42' : 'white',
              }}
            >
              <RadioGroupPrimitive.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-white" />
            </RadioGroupPrimitive.Item>
            <label
              htmlFor={`radio-${option.value}`}
              className="text-sm text-brand-text cursor-pointer hover:text-brand-gray-text transition-colors"
            >
              {option.label}
            </label>
          </div>
        ))}
      </RadioGroupPrimitive.Root>

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
};
