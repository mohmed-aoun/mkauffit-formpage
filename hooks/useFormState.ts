'use client';

import { useState, useCallback, useEffect } from 'react';
import { FormData } from '@/types/form';
import { defaultFormValues } from '@/types/form';
import { validateField } from '@/lib/formValidation';

const STORAGE_KEY = 'health_coaching_form_data';

interface UseFormStateReturn {
  data: Partial<FormData>;
  errors: Record<string, string>;
  currentPage: number;
  isDirty: boolean;
  updateField: (field: string, value: any) => void;
  blurField: (field: string) => void;
  setCurrentPage: (page: number) => void;
  clearForm: () => void;
  loadFormData: () => void;
  resetErrors: () => void;
}

export function useFormState(): UseFormStateReturn {
  const [data, setData] = useState<Partial<FormData>>(defaultFormValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isDirty, setIsDirty] = useState(false);

  // Load from sessionStorage on mount
  useEffect(() => {
    loadFormData();

    // Optional cleanup: remove any old localStorage data
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Could not remove old localStorage data:', error);
    }
  }, []);

  // Save to sessionStorage on data change
  useEffect(() => {
    if (isDirty) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error('Failed to save form data to sessionStorage:', error);
      }
    }
  }, [data, isDirty]);

  const loadFormData = useCallback(() => {
    try {
      const savedData = sessionStorage.getItem(STORAGE_KEY);
      if (savedData) {
        setData(JSON.parse(savedData));
        setIsDirty(false);
      }
    } catch (error) {
      console.error('Failed to load form data from sessionStorage:', error);
    }
  }, []);

  const updateField = useCallback(
    (field: string, value: any) => {
      setData((prev) => ({
        ...prev,
        [field]: value,
      }));
      setIsDirty(true);

      // Clear error for this field when user starts typing
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    },
    []
  );

  const blurField = useCallback(
    (field: string) => {
      const error = validateField(field, data[field as keyof FormData], data);
      setErrors((prev) => {
        if (error) {
          return { ...prev, [field]: error };
        } else {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        }
      });
    },
    [data]
  );

  const clearForm = useCallback(() => {
    setData(defaultFormValues);
    setErrors({});
    setCurrentPage(1);
    setIsDirty(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear sessionStorage:', error);
    }
  }, []);

  const resetErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    data,
    errors,
    currentPage,
    isDirty,
    updateField,
    blurField,
    setCurrentPage,
    clearForm,
    loadFormData,
    resetErrors,
  };
}
