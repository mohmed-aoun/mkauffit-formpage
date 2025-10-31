'use client';

import React from 'react';
import {
  TextInput,
  TextArea,
  SliderInput,
  RadioGroup,
  SelectDropdown,
} from './FormFields';
import { FormData } from '@/types/form';

const TIMEZONE_OPTIONS = [
  { value: 'EST', label: 'EST (Eastern Standard Time)' },
  { value: 'CST', label: 'CST (Central Standard Time)' },
  { value: 'MST', label: 'MST (Mountain Standard Time)' },
  { value: 'PST', label: 'PST (Pacific Standard Time)' },
  { value: 'AKST', label: 'AKST (Alaska Standard Time)' },
  { value: 'HST', label: 'HST (Hawaii Standard Time)' },
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
  { value: 'GMT', label: 'GMT (Greenwich Mean Time)' },
  { value: 'CET', label: 'CET (Central European Time)' },
  { value: 'IST', label: 'IST (Indian Standard Time)' },
  { value: 'JST', label: 'JST (Japan Standard Time)' },
  { value: 'AEST', label: 'AEST (Australian Eastern Standard Time)' },
];

interface Page1FormProps {
  data: Partial<FormData>;
  errors: Record<string, string>;
  onChange: (field: string, value: any) => void;
  onBlur: (field: string) => void;
}

export const Page1Form: React.FC<Page1FormProps> = ({
  data,
  errors,
  onChange,
  onBlur,
}) => {
  return (
    <div className="space-y-6">
      {/* Section 1: Personal Information */}
      <div className="pb-6 border-b border-gray-200">
        <div className="bg-brand-gray-light border-l-4 border-brand-orange px-4 py-3 mb-5">
          <h2 className="text-sm font-semibold text-brand-text">
            Personal Information
          </h2>
        </div>

        <TextInput
          label="Full Name"
          placeholder="e.g., John Smith"
          value={data.fullName || ''}
          onChange={(e) => onChange('fullName', e.target.value)}
          onBlur={() => onBlur('fullName')}
          error={errors.fullName}
          required
        />

        <TextInput
          label="Email"
          placeholder="e.g., john@example.com"
          type="email"
          value={data.email || ''}
          onChange={(e) => onChange('email', e.target.value)}
          onBlur={() => onBlur('email')}
          error={errors.email}
          required
        />

        <TextInput
          label="Age"
          placeholder="e.g., 28"
          type="number"
          value={data.age ? String(data.age) : ''}
          onChange={(e) => onChange('age', e.target.value ? parseInt(e.target.value) : '')}
          onBlur={() => onBlur('age')}
          error={errors.age}
          required
        />

        <TextInput
          label="Height"
          placeholder="e.g., 5'10\" or 178cm"
          value={data.height || ''}
          onChange={(e) => onChange('height', e.target.value)}
          onBlur={() => onBlur('height')}
          error={errors.height}
          required
        />

        <TextInput
          label="Current Weight"
          placeholder="e.g., 180 lbs or 82 kg"
          value={data.currentWeight || ''}
          onChange={(e) => onChange('currentWeight', e.target.value)}
          onBlur={() => onBlur('currentWeight')}
          error={errors.currentWeight}
          required
        />

        <SelectDropdown
          label="Your Current Time Zone"
          options={TIMEZONE_OPTIONS}
          value={data.timeZone || ''}
          onChange={(value) => onChange('timeZone', value)}
          onBlur={() => onBlur('timeZone')}
          error={errors.timeZone}
          required
        />

        <TextInput
          label="How do you hear about me?"
          placeholder="e.g., Instagram, friend referral, Google search, etc."
          value={data.howDidYouHear || ''}
          onChange={(e) => onChange('howDidYouHear', e.target.value)}
          onBlur={() => onBlur('howDidYouHear')}
        />
      </div>

      {/* Section 2: Goals & Motivation */}
      <div className="pb-6">
        <div className="bg-brand-gray-light border-l-4 border-brand-orange px-4 py-3 mb-5">
          <h2 className="text-sm font-semibold text-brand-text">
            Goals & Motivation
          </h2>
        </div>

        <TextArea
          label="What is your #1 goal right now?"
          placeholder="e.g. Fat loss? Build muscle? Feel better overall? Prepare for an event?"
          value={data.mainGoal || ''}
          onChange={(e) => onChange('mainGoal', e.target.value)}
          onBlur={() => onBlur('mainGoal')}
          error={errors.mainGoal}
          required
          rows={4}
        />

        <TextArea
          label="Why do you want to achieve this goal? What would change in your life if you achieved it?"
          placeholder="Describe the impact..."
          value={data.goalMotivation || ''}
          onChange={(e) => onChange('goalMotivation', e.target.value)}
          onBlur={() => onBlur('goalMotivation')}
          error={errors.goalMotivation}
          required
          rows={4}
        />

        <RadioGroup
          label="Have you tried to reach this goal before?"
          options={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ]}
          value={data.triedBefore || ''}
          onChange={(value) => onChange('triedBefore', value)}
          error={errors.triedBefore}
          required
          layout="horizontal"
        />

        <TextArea
          label="What got in the way/what held you back?"
          placeholder="What obstacles or challenges prevented progress?"
          value={data.whatHeldYouBack || ''}
          onChange={(e) => onChange('whatHeldYouBack', e.target.value)}
          onBlur={() => onBlur('whatHeldYouBack')}
          error={errors.whatHeldYouBack}
          required
          rows={4}
        />

        <TextArea
          label="If you don't make a change now, how will you feel 3–6 months from today?"
          placeholder="Describe the potential consequences..."
          value={data.feeling3to6Months || ''}
          onChange={(e) => onChange('feeling3to6Months', e.target.value)}
          onBlur={() => onBlur('feeling3to6Months')}
          error={errors.feeling3to6Months}
          required
          rows={4}
        />

        <SliderInput
          label="On a scale of 1–10, how committed are you to making a real change right now?"
          value={data.commitmentLevel || 5}
          onChange={(value) => onChange('commitmentLevel', value)}
          min={1}
          max={10}
          minLabel="1 (Not at all)"
          maxLabel="10 (Very committed)"
          error={errors.commitmentLevel}
          required
        />
      </div>
    </div>
  );
};
