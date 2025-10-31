import { FormData } from '@/types/form';

export class AppsScriptError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'AppsScriptError';
  }
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
  timestamp?: string;
}

/**
 * Submit form data to Google Apps Script endpoint
 */
export async function submitFormToGoogleSheets(
  formData: FormData
): Promise<SubmissionResponse> {
  const appsScriptUrl =
    process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL ||
    process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!appsScriptUrl) {
    throw new AppsScriptError(
      500,
      'Google Apps Script URL not configured'
    );
  }

  try {
    // Convert off-track triggers array to comma-separated string
    const payload = {
      ...formData,
      throwsYouOffTrack: Array.isArray(formData.throwsYouOffTrack)
        ? formData.throwsYouOffTrack.join(', ')
        : formData.throwsYouOffTrack,
      timestamp: new Date().toISOString(),
    };

    const response = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      mode: 'no-cors', // Google Apps Script deployments often require this
    });

    // With no-cors mode, we can't read the response body for errors
    // So we'll assume success if there's no network error
    return {
      success: true,
      message: 'Form submitted successfully',
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new AppsScriptError(
        500,
        `Failed to submit form: ${error.message}`
      );
    }
    throw new AppsScriptError(500, 'Failed to submit form: Unknown error');
  }
}

/**
 * Format form data for Google Sheets storage
 * Returns data in the order expected by the sheet
 */
export function formatDataForSheet(formData: FormData): Record<string, any> {
  return {
    timestamp: new Date().toISOString(),
    fullName: formData.fullName,
    email: formData.email,
    age: formData.age,
    height: formData.height,
    currentWeight: formData.currentWeight,
    timeZone: formData.timeZone,
    howDidYouHear: formData.howDidYouHear || '',
    mainGoal: formData.mainGoal,
    goalMotivation: formData.goalMotivation,
    triedBefore: formData.triedBefore,
    whatHeldYouBack: formData.whatHeldYouBack,
    feeling3to6Months: formData.feeling3to6Months,
    commitmentLevel: formData.commitmentLevel,
    throwsYouOffTrack: Array.isArray(formData.throwsYouOffTrack)
      ? formData.throwsYouOffTrack.join(', ')
      : formData.throwsYouOffTrack,
    throwsYouOffTrackOther: formData.throwsYouOffTrackOther || '',
    supportStyle: formData.supportStyle,
    workingWithCoach: formData.workingWithCoach,
    gymAccess: formData.gymAccess,
    exerciseDaysPerWeek: formData.exerciseDaysPerWeek,
    workoutTypes: formData.workoutTypes,
    stepsTracking: formData.stepsTracking,
    medicalConditions: formData.medicalConditions,
    typicalEating: formData.typicalEating,
    openToTrackingFood: formData.openToTrackingFood,
    currentlyTrackingFood: formData.currentlyTrackingFood,
    dietaryNeeds: formData.dietaryNeeds,
    eatingOutFrequency: formData.eatingOutFrequency,
    waterIntake: formData.waterIntake,
    sleepHours: formData.sleepHours,
    sleepQuality: formData.sleepQuality,
    stressLevel: formData.stressLevel,
    travelSchedule: formData.travelSchedule,
    coachingType: formData.coachingType,
    startTimeline: formData.startTimeline,
    additionalNotes: formData.additionalNotes || '',
  };
}
