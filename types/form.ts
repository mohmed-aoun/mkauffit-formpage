import { z } from 'zod';

// Validation schemas
export const PersonalInfoSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  age: z.coerce.number().int('Age must be a whole number').min(15, 'Age must be at least 15').max(120, 'Age must be at most 120'),
  height: z.string().min(2, 'Height is required').max(50),
  currentWeight: z.string().min(2, 'Weight is required').max(50),
  timeZone: z.string().min(1, 'Please select a time zone'),
  howDidYouHear: z.string().max(200).optional(),
});

export const GoalsMotivationSchema = z.object({
  mainGoal: z.string().min(10, 'Please describe your main goal (at least 10 characters)').max(500),
  goalMotivation: z.string().min(10, 'Please explain why this goal matters (at least 10 characters)').max(1000),
  triedBefore: z.enum(['yes', 'no']),
  whatHeldYouBack: z.string().min(5, 'Please describe what held you back').max(1000),
  feeling3to6Months: z.string().min(5, 'Please describe how you\'d feel without making changes').max(1000),
  commitmentLevel: z.coerce.number().int().min(1).max(10),
});

export const LifestyleSchema = z.object({
  throwsYouOffTrack: z.array(z.string()).min(1, 'Please select at least one option'),
  throwsYouOffTrackOther: z.string().max(100).optional(),
  supportStyle: z.enum(['step-by-step', 'accountability', 'tough-love', 'all-three']),
  workingWithCoach: z.enum(['yes', 'no']),
  gymAccess: z.enum(['commercial', 'home', 'none']),
});

export const WorkoutDetailsSchema = z.object({
  exerciseDaysPerWeek: z.coerce.number().int().min(0).max(7),
  workoutTypes: z.string().min(2, 'Please describe your workout types').max(200),
});

export const HealthPhysicalSchema = z.object({
  stepsTracking: z.string().max(100).optional(),
  medicalConditions: z.string().min(2, 'Please describe your medical considerations').max(1000),
  typicalEating: z.string().min(10, 'Please describe your typical eating patterns').max(1000),
  openToTrackingFood: z.enum(['yes', 'no', 'maybe']),
  currentlyTrackingFood: z.enum(['yes', 'no', 'sometimes']),
  dietaryNeeds: z.string().min(2, 'Please describe your dietary needs').max(1000),
  eatingOutFrequency: z.enum(['rarely', '1-2x', '3-4x', '5plus']),
  waterIntake: z.enum(['less1L', '1-2L', '2-3L', '3plus']),
  sleepHours: z.enum(['less5', '6', '7', '8', '9plus']),
  sleepQuality: z.enum(['tired', 'rested', 'inconsistent']),
  stressLevel: z.coerce.number().int().min(1).max(10),
  travelSchedule: z.enum(['yes', 'no', 'occasionally']),
});

export const ProgramInterestSchema = z.object({
  coachingType: z.enum(['fitness', 'nutrition', 'both']),
  startTimeline: z.enum(['immediately', '1-4weeks', 'month', 'not-sure']),
  additionalNotes: z.string().max(1000).optional(),
});

// Combined form schema
export const FormSchema = PersonalInfoSchema.merge(GoalsMotivationSchema)
  .merge(LifestyleSchema)
  .merge(WorkoutDetailsSchema)
  .merge(HealthPhysicalSchema)
  .merge(ProgramInterestSchema);

export type FormData = z.infer<typeof FormSchema>;

// Type for each page's data
export type Page1Data = z.infer<typeof PersonalInfoSchema> & z.infer<typeof GoalsMotivationSchema>;
export type Page2Data = z.infer<typeof LifestyleSchema> & z.infer<typeof WorkoutDetailsSchema>;
export type Page3Data = z.infer<typeof HealthPhysicalSchema>;
export type Page4Data = z.infer<typeof ProgramInterestSchema>;

export const defaultFormValues: FormData = {
  // --- Page 1 ---
  fullName: '',
  email: '',
  age: 0,
  height: '',
  currentWeight: '',
  timeZone: '',
  howDidYouHear: '',

  // --- Page 2 ---
  mainGoal: '',
  goalMotivation: '',
  triedBefore: 'no',
  whatHeldYouBack: '',
  feeling3to6Months: '',
  commitmentLevel: 5,

  throwsYouOffTrack: [],
  throwsYouOffTrackOther: '',
  supportStyle: 'step-by-step',
  workingWithCoach: 'no',
  gymAccess: 'none',

  exerciseDaysPerWeek: 5,
  workoutTypes: '',

  // --- Page 3 ---
  stepsTracking: '',
  medicalConditions: '',
  typicalEating: '',
  openToTrackingFood: 'no',
  currentlyTrackingFood: 'no',
  dietaryNeeds: '',
  eatingOutFrequency: 'rarely',
  waterIntake: '1-2L',
  sleepHours: '7',
  sleepQuality: 'rested',
  stressLevel: 5,
  travelSchedule: 'no',

  // --- Page 4 ---
  coachingType: 'fitness',
  startTimeline: 'not-sure',
  additionalNotes: '',
};

