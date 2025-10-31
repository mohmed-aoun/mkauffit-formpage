'use client';

import { useState, useCallback } from 'react';
import { FormData } from '@/types/form';
import { submitFormToGoogleSheets, AppsScriptError } from '@/lib/appsScriptClient';

interface UseFormSubmitReturn {
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  submitForm: (data: FormData) => Promise<void>;
  resetSubmitState: () => void;
}

export function useFormSubmit(): UseFormSubmitReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const submitForm = useCallback(async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await submitFormToGoogleSheets(data);
      setSubmitSuccess(true);
    } catch (error) {
      if (error instanceof AppsScriptError) {
        setSubmitError(error.message);
      } else if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const resetSubmitState = useCallback(() => {
    setIsSubmitting(false);
    setSubmitError(null);
    setSubmitSuccess(false);
  }, []);

  return {
    isSubmitting,
    submitError,
    submitSuccess,
    submitForm,
    resetSubmitState,
  };
}
