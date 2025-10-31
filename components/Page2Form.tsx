'use client';

import React from 'react';
import {
  TextInput,
  SliderInput,
  RadioGroup,
  CheckboxGroup,
} from './FormFields';
import { FormData } from '@/types/form';

interface Page2FormProps {
  data: Partial<FormData>;
  errors: Record<string, string>;
  onChange: (field: string, value: any) => void;
  onBlur: (field: string) => void;
}

export const Page2Form: React.FC<Page2FormProps> = ({
  data,
  errors,
  onChange,
  onBlur,
}) => {
  return (
    <div className="space-y-6">
      {/* Section 1: Current Lifestyle & Struggles */}
      <div className="pb-6 border-b border-gray-200">
        <div className="bg-brand-gray-light border-l-4 border-brand-orange px-4 py-3 mb-5">
          <h2 className="text-sm font-semibold text-brand-text">
            Current Lifestyle & Struggles
          </h2>
        </div>

        <CheckboxGroup
          label="What tends to throw you off track?"
          options={[
            { value: 'all-or-nothing', label: 'All-or-nothing thinking' },
            { value: 'emotional-eating', label: 'Emotional/Stress eating' },
            { value: 'lack-motivation', label: 'Lack of motivation' },
            { value: 'no-accountability', label: 'Not having accountability' },
            { value: 'dont-know', label: 'Not knowing what to do' },
            { value: 'other', label: 'Other', allowsOther: true },
          ]}
          value={(data.throwsYouOffTrack as string[]) || []}
          onChange={(value) => onChange('throwsYouOffTrack', value)}
          otherText={data.throwsYouOffTrackOther || ''}
          onOtherTextChange={(text) =>
            onChange('throwsYouOffTrackOther', text)
          }
          error={errors.throwsYouOffTrack}
          required
        />

        <RadioGroup
          label="What kind of support do you respond best to?"
          options={[
            { value: 'step-by-step', label: 'Step-by-step / clear direction' },
            { value: 'accountability', label: 'Accountability & motivation' },
            { value: 'tough-love', label: 'Tough love / no-nonsense' },
            { value: 'all-three', label: 'A mix of all three' },
          ]}
          value={data.supportStyle || ''}
          onChange={(value) => onChange('supportStyle', value)}
          error={errors.supportStyle}
          required
        />

        <RadioGroup
          label="Are you currently working with any coach/trainer?"
          options={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ]}
          value={data.workingWithCoach || ''}
          onChange={(value) => onChange('workingWithCoach', value)}
          error={errors.workingWithCoach}
          required
          layout="horizontal"
        />

        <RadioGroup
          label="Do you have access to a gym or home exercise equipment?"
          options={[
            { value: 'commercial', label: 'Commercial gym' },
            { value: 'home', label: 'Home gym' },
            { value: 'none', label: 'No equipment' },
          ]}
          value={data.gymAccess || ''}
          onChange={(value) => onChange('gymAccess', value)}
          error={errors.gymAccess}
          required
        />
      </div>

      {/* Section 2: Current Workout Details */}
      <div className="pb-6">
        <div className="bg-brand-gray-light border-l-4 border-brand-orange px-4 py-3 mb-5">
          <h2 className="text-sm font-semibold text-brand-text">
            Current Workout Details
          </h2>
        </div>

        <SliderInput
          label="How many days per week do you exercise?"
          value={data.exerciseDaysPerWeek || 0}
          onChange={(value) => onChange('exerciseDaysPerWeek', value)}
          min={0}
          max={7}
          minLabel="0 days"
          maxLabel="7 days"
          error={errors.exerciseDaysPerWeek}
          required
        />

        <TextInput
          label="What type of workouts?"
          placeholder="e.g., abs, cardio, strength training, yoga, etc."
          value={data.workoutTypes || ''}
          onChange={(e) => onChange('workoutTypes', e.target.value)}
          onBlur={() => onBlur('workoutTypes')}
          error={errors.workoutTypes}
          required
        />
      </div>
    </div>
  );
};
