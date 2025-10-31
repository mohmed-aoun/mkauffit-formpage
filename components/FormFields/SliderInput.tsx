'use client';

import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  minLabel?: string;
  maxLabel?: string;
  error?: string;
  required?: boolean;
}

export const SliderInput: React.FC<SliderInputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  minLabel,
  maxLabel,
  error,
  required = false,
}) => {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-brand-text mb-3">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-brand-gray-text">
          {minLabel || min}
        </span>
        <span className="text-sm font-medium text-brand-orange">
          {value}
        </span>
        <span className="text-xs text-brand-gray-text">
          {maxLabel || max}
        </span>
      </div>

      <SliderPrimitive.Root
        min={min}
        max={max}
        step={1}
        value={[value]}
        onValueChange={(vals) => onChange(vals[0])}
        className="relative flex items-center w-full h-5 touch-none select-none"
      >
        <SliderPrimitive.Track className="relative flex-grow h-2 bg-brand-gray rounded-full">
          <SliderPrimitive.Range
            className="absolute h-full bg-brand-orange rounded-full"
            style={{
              backgroundColor: '#ff8c42',
            }}
          />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="block w-5 h-5 bg-brand-orange rounded-full shadow-lg cursor-pointer hover:bg-brand-orange-dark focus:outline-none focus:ring-2 focus:ring-orange-300"
          style={{
            backgroundColor: '#ff8c42',
          }}
        />
      </SliderPrimitive.Root>

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
};
