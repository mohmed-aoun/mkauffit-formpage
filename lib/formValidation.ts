import { FormData, FormSchema } from '@/types/form';
import { ZodError } from 'zod';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validate entire form data
 */
export function validateFormData(data: Partial<FormData>): ValidationResult {
  try {
    FormSchema.parse(data);
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { isValid: false, errors };
    }
    return {
      isValid: false,
      errors: { general: 'Validation failed' },
    };
  }
}

/**
 * Validate specific field
 */
export function validateField(
  field: string,
  value: any,
  allData: Partial<FormData>
): string | null {
  try {
    // Create a validation schema for just this field
    const testData = { ...allData, [field]: value };
    FormSchema.parse(testData);
    return null;
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldError = error.errors.find(
        (err) => err.path[0] === field
      );
      return fieldError?.message || null;
    }
    return null;
  }
}

/**
 * Get validation errors for a specific page
 */
export function validatePage(
  pageNumber: number,
  data: Partial<FormData>
): Record<string, string> {
  const allErrors = validateFormData(data).errors;
  const errors: Record<string, string> = {};

  // Map fields to pages
  const pageFields: Record<number, string[]> = {
    1: [
      'fullName',
      'email',
      'age',
      'height',
      'currentWeight',
      'timeZone',
      'mainGoal',
      'goalMotivation',
      'triedBefore',
      'whatHeldYouBack',
      'feeling3to6Months',
      'commitmentLevel',
    ],
    2: [
      'throwsYouOffTrack',
      'supportStyle',
      'workingWithCoach',
      'gymAccess',
      'exerciseDaysPerWeek',
      'workoutTypes',
    ],
    3: [
      'stepsTracking',
      'medicalConditions',
      'typicalEating',
      'openToTrackingFood',
      'currentlyTrackingFood',
      'dietaryNeeds',
      'eatingOutFrequency',
      'waterIntake',
      'sleepHours',
      'sleepQuality',
      'stressLevel',
      'travelSchedule',
    ],
    4: ['coachingType', 'startTimeline'],
  };

  const fieldsForPage = pageFields[pageNumber] || [];

  fieldsForPage.forEach((field) => {
    if (allErrors[field]) {
      errors[field] = allErrors[field];
    }
  });

  return errors;
}

/**
 * Check if page can advance to next
 */
export function canAdvancePage(
  currentPage: number,
  data: Partial<FormData>
): boolean {
  const pageErrors = validatePage(currentPage, data);
  return Object.keys(pageErrors).length === 0;
}
