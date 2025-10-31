'use client';

import React from 'react';
import { FormData } from '@/types/form';

interface ThankYouPageProps {
  data: Partial<FormData>;
  onBackToForm?: () => void;
  onClearForm?: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({
  data,
  onBackToForm,
  onClearForm,
}) => {
  return (
    <div className="space-y-6">
      {/* Thank You Banner */}
      <div className="bg-purple-600 text-white p-6 rounded-md">
        <h1 className="text-2xl font-semibold">Thank You!</h1>
      </div>

      {/* What's Next Section */}
      <div className="bg-white border border-gray-200 p-6 rounded-md">
        <h2 className="text-lg font-semibold text-brand-text mb-3">
          What's Next
        </h2>
        <p className="text-sm text-brand-gray-text leading-relaxed">
          This is the first step in your health journey. We'll dig deeper during
          our 1-on-1, and I'll use everything we cover to build a program that's
          realistic, effective, and tailored to your goals. If you have any
          questions, send me an email at{' '}
          <a
            href="mailto:mkauffit@gmail.com"
            className="text-brand-orange hover:text-brand-orange-dark font-medium"
          >
            mkauffit@gmail.com
          </a>
        </p>
      </div>

      {/* Data Summary */}
      <div className="bg-brand-gray-light border border-gray-200 p-6 rounded-md">
        <h3 className="text-sm font-semibold text-brand-text mb-4">
          Submitted Information
        </h3>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium text-brand-text">Name:</span>{' '}
            <span className="text-brand-gray-text">{data.fullName}</span>
          </div>
          <div>
            <span className="font-medium text-brand-text">Email:</span>{' '}
            <span className="text-brand-gray-text">{data.email}</span>
          </div>
          <div>
            <span className="font-medium text-brand-text">Main Goal:</span>{' '}
            <span className="text-brand-gray-text">{data.mainGoal}</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        {onBackToForm && (
          <button
            onClick={onBackToForm}
            className="px-4 py-2 border border-purple-600 text-purple-600 rounded-md text-sm font-medium hover:bg-purple-50 transition-colors"
          >
            Back to form
          </button>
        )}
        {onClearForm && (
          <button
            onClick={onClearForm}
            className="ml-auto text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors"
          >
            Clear form
          </button>
        )}
      </div>
    </div>
  );
};
