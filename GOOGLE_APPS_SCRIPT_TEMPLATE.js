/**
 * Google Apps Script Template for Health Coaching Form
 *
 * Setup Instructions:
 * 1. Create a new Google Apps Script project in Google Cloud Console
 * 2. Copy this code into the script editor
 * 3. Create a new Google Sheet with column headers matching the form fields
 * 4. Deploy as web app (New Deployment -> Web app)
 * 5. Set Execute as: Your email, Who has access: Anyone
 * 6. Copy the deployment URL and add to .env.local as NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL
 *
 * Column Headers (in this order):
 * A1: Timestamp
 * B1: Full Name
 * C1: Email
 * D1: Age
 * E1: Height
 * F1: Current Weight
 * G1: Time Zone
 * H1: How did you hear about me
 * I1: Main Goal
 * J1: Goal Motivation
 * K1: Tried Goal Before
 * L1: What Held You Back
 * M1: Feeling in 3-6 Months
 * N1: Commitment Level
 * O1: Throws You Off Track
 * P1: Support Style
 * Q1: Working with Coach
 * R1: Gym Access
 * S1: Exercise Days Per Week
 * T1: Workout Types
 * U1: Steps Tracking
 * V1: Medical Conditions
 * W1: Typical Eating
 * X1: Open to Tracking Food
 * Y1: Currently Tracking Food
 * Z1: Dietary Needs
 * AA1: Eating Out Frequency
 * AB1: Water Intake
 * AC1: Sleep Hours
 * AD1: Sleep Quality
 * AE1: Stress Level
 * AF1: Travel Schedule
 * AG1: Coaching Type
 * AH1: Start Timeline
 * AI1: Additional Notes
 */

// Get the active spreadsheet
const SHEET_NAME = 'Form Responses'; // Change this to your sheet name

function doPost(e) {
  try {
    // Parse the incoming data
    const payload = e.postData.contents;
    const data = JSON.parse(payload);

    // Get the spreadsheet and sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // If sheet doesn't exist, create it
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      createHeaders(sheet);
    }

    // Prepare the row data
    const row = [
      new Date().toISOString(), // Timestamp
      data.fullName || '',
      data.email || '',
      data.age || '',
      data.height || '',
      data.currentWeight || '',
      data.timeZone || '',
      data.howDidYouHear || '',
      data.mainGoal || '',
      data.goalMotivation || '',
      data.triedBefore || '',
      data.whatHeldYouBack || '',
      data.feeling3to6Months || '',
      data.commitmentLevel || '',
      data.throwsYouOffTrack || '',
      data.supportStyle || '',
      data.workingWithCoach || '',
      data.gymAccess || '',
      data.exerciseDaysPerWeek || '',
      data.workoutTypes || '',
      data.stepsTracking || '',
      data.medicalConditions || '',
      data.typicalEating || '',
      data.openToTrackingFood || '',
      data.currentlyTrackingFood || '',
      data.dietaryNeeds || '',
      data.eatingOutFrequency || '',
      data.waterIntake || '',
      data.sleepHours || '',
      data.sleepQuality || '',
      data.stressLevel || '',
      data.travelSchedule || '',
      data.coachingType || '',
      data.startTimeline || '',
      data.additionalNotes || '',
    ];

    // Append the row to the sheet
    sheet.appendRow(row);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Form submitted successfully',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Log error for debugging
    Logger.log('Error: ' + error.toString());

    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Helper function to create headers
function createHeaders(sheet) {
  const headers = [
    'Timestamp',
    'Full Name',
    'Email',
    'Age',
    'Height',
    'Current Weight',
    'Time Zone',
    'How did you hear about me',
    'Main Goal',
    'Goal Motivation',
    'Tried Goal Before',
    'What Held You Back',
    'Feeling in 3-6 Months',
    'Commitment Level',
    'Throws You Off Track',
    'Support Style',
    'Working with Coach',
    'Gym Access',
    'Exercise Days Per Week',
    'Workout Types',
    'Steps Tracking',
    'Medical Conditions',
    'Typical Eating',
    'Open to Tracking Food',
    'Currently Tracking Food',
    'Dietary Needs',
    'Eating Out Frequency',
    'Water Intake',
    'Sleep Hours',
    'Sleep Quality',
    'Stress Level',
    'Travel Schedule',
    'Coaching Type',
    'Start Timeline',
    'Additional Notes'
  ];

  sheet.appendRow(headers);
}

// Optional: Add this function to test the script locally
function testScript() {
  const testData = {
    fullName: 'John Doe',
    email: 'john@example.com',
    age: 28,
    height: "5'10\"",
    currentWeight: '180 lbs',
    timeZone: 'EST',
    howDidYouHear: 'Google Search',
    mainGoal: 'Lose weight and build muscle',
    goalMotivation: 'Want to feel healthier and more confident',
    triedBefore: 'yes',
    whatHeldYouBack: 'Lack of consistency and motivation',
    feeling3to6Months: 'Would feel disappointed and stuck',
    commitmentLevel: 8,
    throwsYouOffTrack: 'Emotional eating, Lack of motivation',
    supportStyle: 'accountability',
    workingWithCoach: 'no',
    gymAccess: 'commercial',
    exerciseDaysPerWeek: 4,
    workoutTypes: 'Cardio, Strength training',
    stepsTracking: '7000 steps',
    medicalConditions: 'None',
    typicalEating: 'Breakfast: Eggs and toast, Lunch: Chicken and rice, Dinner: Varies',
    openToTrackingFood: 'maybe',
    currentlyTrackingFood: 'no',
    dietaryNeeds: 'No allergies or restrictions',
    eatingOutFrequency: '1-2x',
    waterIntake: '2-3L',
    sleepHours: '7',
    sleepQuality: 'rested',
    stressLevel: 6,
    travelSchedule: 'no',
    coachingType: 'fitness',
    startTimeline: 'immediately',
    additionalNotes: 'Looking forward to working with you!'
  };

  // Create a mock POST event
  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(e);
  Logger.log(result.getContent());
}
