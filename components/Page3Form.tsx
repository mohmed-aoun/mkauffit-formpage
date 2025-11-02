'use client';

import React from 'react';
import {
  TextInput,
  TextArea,
  SliderInput,
  RadioGroup,
} from './FormFields';
import { FormData } from '@/types/form';

interface Page3FormProps {
  data: Partial<FormData>;
  errors: Record<string, string>;
  onChange: (field: string, value: any) => void;
  onBlur: (field: string) => void;
}

export const Page3Form: React.FC<Page3FormProps> = ({
  data,
  errors,
  onChange,
  onBlur,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-brand-gray-light border-l-4 border-brand-orange px-4 py-3 mb-5">
        <h2 className="text-sm font-semibold text-brand-text">
          Health & Physical Condition
        </h2>
      </div>

      <TextInput
        label="Do you currently track your daily steps? If yes, how many on average?"
        placeholder="e.g., 8000 or N/A if not tracked"
        value={data.stepsTracking || ''}
        onChange={(e) => onChange('stepsTracking', e.target.value)}
        onBlur={() => onBlur('stepsTracking')}
        error={errors.stepsTracking}
        required
      />

      <TextArea
        label="Any current or past injuries / pain / medical conditions I should know about?"
        placeholder="Describe any injuries, conditions, or limitations..."
        value={data.medicalConditions || ''}
        onChange={(e) => onChange('medicalConditions', e.target.value)}
        onBlur={() => onBlur('medicalConditions')}
        error={errors.medicalConditions}
        required
        rows={4}
      />

      <TextArea
        label="Share what a typical day of eating looks like for you"
        placeholder="Describe meals, snacks, drinks, timing, etc."
        value={data.typicalEating || ''}
        onChange={(e) => onChange('typicalEating', e.target.value)}
        onBlur={() => onBlur('typicalEating')}
        error={errors.typicalEating}
        required
        rows={4}
      />

      <RadioGroup
        label="Are you open to tracking your food / calories / macros later on?"
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'maybe', label: 'Maybe' },
        ]}
        value={data.openToTrackingFood || ''}
        onChange={(value) => onChange('openToTrackingFood', value)}
        error={errors.openToTrackingFood}
        required
      />

      <RadioGroup
        label="Do you currently track your food / calories / macros?"
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'sometimes', label: 'Sometimes' },
        ]}
        value={data.currentlyTrackingFood || ''}
        onChange={(value) => onChange('currentlyTrackingFood', value)}
        error={errors.currentlyTrackingFood}
        required
      />

      <TextArea
        label="Any food preferences, dislikes, or dietary needs I should know about?"
        placeholder="Allergies, vegetarian, vegan, restrictions, preferences, etc."
        value={data.dietaryNeeds || ''}
        onChange={(e) => onChange('dietaryNeeds', e.target.value)}
        onBlur={() => onBlur('dietaryNeeds')}
        error={errors.dietaryNeeds}
        required
        rows={4}
      />

      <RadioGroup
        label="How many days per week do you eat out or order delivery food?"
        options={[
          { value: 'rarely', label: 'Rarely' },
          { value: '1-2x', label: '1–2×/week' },
          { value: '3-4x', label: '3–4×/week' },
          { value: '5plus', label: '5+×/week' },
        ]}
        value={data.eatingOutFrequency || ''}
        onChange={(value) => onChange('eatingOutFrequency', value)}
        error={errors.eatingOutFrequency}
        required
      />

      <RadioGroup
        label="How much water do you drink daily (approximation)?"
        options={[
          { value: 'less1L', label: 'Less than 1 L' },
          { value: '1-2L', label: '1–2 L' },
          { value: '2-3L', label: '2–3 L' },
          { value: '3plus', label: '3 L+' },
        ]}
        value={data.waterIntake || ''}
        onChange={(value) => onChange('waterIntake', value)}
        error={errors.waterIntake}
        required
      />

      <RadioGroup
        label="On average, how many hours of sleep do you get per night?"
        options={[
          { value: 'less5', label: '< 5 hours' },
          { value: '6', label: '6 hours' },
          { value: '7', label: '7 hours' },
          { value: '8', label: '8 hours' },
          { value: '9plus', label: '9+ hours' },
        ]}
        value={data.sleepHours || 5}
        onChange={(value) => onChange('sleepHours', value)}
        error={errors.sleepHours}
        required
      />

      <RadioGroup
        label="What's your sleep quality like?"
        options={[
          { value: 'tired', label: 'I wake up tired most days' },
          { value: 'rested', label: 'I feel rested most days' },
          { value: 'inconsistent', label: "It's inconsistent" },
        ]}
        value={data.sleepQuality || ''}
        onChange={(value) => onChange('sleepQuality', value)}
        error={errors.sleepQuality}
        required
      />

      <SliderInput
        label="What's your stress level like on a daily basis?"
        value={data.stressLevel || 5}
        onChange={(value) => onChange('stressLevel', value)}
        min={1}
        max={10}
        minLabel="1 (Very low)"
        maxLabel="10 (Very high)"
        error={errors.stressLevel}
        required
      />

      <RadioGroup
        label="Do you travel often or live on an inconsistent schedule?"
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'occasionally', label: 'Occasionally' },
        ]}
        value={data.travelSchedule || ''}
        onChange={(value) => onChange('travelSchedule', value)}
        error={errors.travelSchedule}
        required
      />
    </div>
  );
};
