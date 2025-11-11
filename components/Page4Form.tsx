'use client';

import React from 'react';
import {
  TextArea,
  RadioGroup,
} from './FormFields';
import { FormData } from '@/types/form';

interface Page4FormProps {
  data: Partial<FormData>;
  errors: Record<string, string>;
  hasAttemptedSubmit: boolean;
  onChange: (field: string, value: any) => void;
  onBlur: (field: string) => void;
}

export const Page4Form: React.FC<Page4FormProps> = ({
  data,
  errors,
  hasAttemptedSubmit,
  onChange,
  onBlur,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-brand-gray-light border-l-4 border-brand-orange px-4 py-3 mb-5">
        <h2 className="text-sm font-semibold text-brand-text">
          Program Interest
        </h2>
      </div>

      <RadioGroup
        label="What type of coaching are you interested in?"
        options={[
          { value: 'fitness', label: 'Fitness Coaching' },
          { value: 'nutrition', label: 'Nutrition Coaching' },
          { value: 'both', label: 'Fitness + Nutrition Coaching' },
        ]}
        value={data.coachingType || ''}
        onChange={(value) => onChange('coachingType', value)}
        error={errors.coachingType}
        required
      />
      {hasAttemptedSubmit && errors.coachingType && (
          <p className="text-red-600 text-sm mt-1">{errors.coachingType}</p>
      )}

      <RadioGroup
        label="If we're a great fit, are you looking to start coaching:"
        options={[
          { value: 'immediately', label: 'Immediately' },
          { value: '1-4weeks', label: 'In the next 1–4 weeks' },
          { value: 'month', label: 'In the next month' },
          { value: 'not-sure', label: 'Not sure / exploring for now' },
        ]}
        value={data.startTimeline || ''}
        onChange={(value) => onChange('startTimeline', value)}
        error={errors.startTimeline}
        required
      />
      {hasAttemptedSubmit && errors.startTimeline && (
          <p className="text-red-600 text-sm mt-1">{errors.startTimeline}</p>
      )}

      <TextArea
        label="Is there anything else you want me to know before our consultation?"
        placeholder="Additional notes or questions..."
        value={data.additionalNotes || ''}
        onChange={(value) => onChange('additionalNotes', value)}
        onBlur={() => onBlur('additionalNotes')}
        error={errors.additionalNotes}
        rows={4}
      />
      {hasAttemptedSubmit && errors.additionalNotes && (
          <p className="text-red-600 text-sm mt-1">{errors.additionalNotes}</p>
      )}
    </div>
  );
};
