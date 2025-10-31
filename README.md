# Health Coaching Pre-Consultation Form

A modern, multi-page health coaching pre-consultation form built with Next.js, React, Tailwind CSS, and Zod validation. The form collects comprehensive health and fitness information and stores responses in a Google Sheet.

## Features

- **5-page form** with smooth navigation and validation
- **Modern UI components**: Sliders, radio buttons, checkboxes, text inputs
- **Orange accent theme** with white/bright background
- **Form validation** with Zod and React Hook Form
- **localStorage persistence** - form data is automatically saved
- **Google Sheets integration** - responses stored in Google Sheets via Apps Script
- **Responsive design** - works on desktop and mobile
- **Accessibility-first** - keyboard navigation, proper ARIA labels, focus states

## Form Structure

### Page 1: Personal Information & Goals (13 questions)
- Full Name, Email, Age, Height, Weight
- Time Zone
- How did you hear about me
- Main goal
- Goal motivation
- Have you tried before
- What held you back
- Feeling in 3-6 months
- Commitment level (slider 1-10)

### Page 2: Lifestyle & Current Workout (5 questions)
- What throws you off track (checkboxes)
- Preferred support style (radio)
- Working with coach (radio)
- Gym/equipment access (radio)
- Exercise frequency (slider 0-7 days)
- Workout types

### Page 3: Health & Physical Condition (12 questions)
- Daily steps tracking
- Medical conditions/injuries
- Typical eating patterns
- Open to tracking food
- Currently tracking food
- Dietary needs/preferences
- Eating out frequency
- Daily water intake
- Sleep hours per night
- Sleep quality
- Stress level (slider 1-10)
- Travel/schedule consistency

### Page 4: Program Interest (3 questions)
- Coaching type interest
- Start timeline
- Additional notes

### Page 5: Thank You
- Confirmation message
- Submitted data preview
- Contact information

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Form State**: React Hook Form + Zod
- **UI Components**: Radix UI primitives
- **Backend**: Google Apps Script (no server needed)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Google account (for Google Apps Script)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mkauffit-formpage.git
cd mkauffit-formpage
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```bash
cp .env.local.example .env.local
```

4. Add your Google Apps Script URL (see setup below):
```
NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercontent
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Google Sheets Integration Setup

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "Health Coaching Form Responses"

### Step 2: Set Up Google Apps Script

1. In your Google Sheet, go to **Tools > Script editor**
2. Delete any template code
3. Copy the entire code from `GOOGLE_APPS_SCRIPT_TEMPLATE.js` into the editor
4. Save the project (give it a name like "Health Coaching Form Script")

### Step 3: Deploy the Script

1. Click **New Deployment** (or "Deploy > New Deployment" if older interface)
2. Select **Type**: "Web app"
3. Set **Execute as**: Your Google account
4. Set **Who has access**: "Anyone"
5. Click **Deploy**
6. Copy the deployment URL (it will look like: `https://script.google.com/macros/d/SCRIPT_ID/usercontent`)

### Step 4: Add the URL to Your Form

1. Paste the deployment URL into your `.env.local`:
```
NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercontent
```

2. Restart your development server

## Building and Deployment

### Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variable: `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL`
5. Deploy

## File Structure

```
mkauffit-formpage/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── FormContainer.tsx    # Main form component
│   ├── Page1Form.tsx        # Personal info & goals
│   ├── Page2Form.tsx        # Lifestyle & workout
│   ├── Page3Form.tsx        # Health & physical
│   ├── Page4Form.tsx        # Program interest
│   ├── ThankYouPage.tsx     # Thank you page
│   └── FormFields/          # Reusable form components
│       ├── TextInput.tsx
│       ├── TextArea.tsx
│       ├── SliderInput.tsx
│       ├── RadioGroup.tsx
│       ├── CheckboxGroup.tsx
│       ├── SelectDropdown.tsx
│       └── index.ts
├── hooks/
│   ├── useFormState.ts      # Form state management
│   └── useFormSubmit.ts     # Form submission hook
├── lib/
│   ├── formValidation.ts    # Validation logic
│   └── appsScriptClient.ts  # Google Apps Script client
├── types/
│   └── form.ts              # TypeScript types & Zod schemas
├── .env.local               # Environment variables
├── tailwind.config.js       # Tailwind configuration
└── tsconfig.json            # TypeScript configuration
```

## Customization

### Theme Colors

Edit `tailwind.config.js` to customize the color scheme:

```js
colors: {
  'brand-orange': '#ff8c42',
  'brand-orange-dark': '#e67e31',
  'brand-gray-light': '#f5f5f5',
  'brand-gray': '#d1d5db',
  'brand-gray-text': '#6b7280',
  'brand-text': '#1f2937',
}
```

### Form Fields

Modify the form components in `components/Page[N]Form.tsx` to add/remove fields.

### Validation Rules

Update the Zod schema in `types/form.ts` to change validation rules:

```ts
age: z.coerce.number().int().min(15).max(120),
```

## Form Features

### Auto-Save

Form data is automatically saved to browser localStorage. Users can close and return later to continue where they left off.

### Validation

- Real-time field validation on blur
- Page-level validation before advancing
- Clear error messages
- Error summary shown before page navigation

### Accessibility

- Keyboard navigation support
- Focus indicators with orange ring
- ARIA labels on all form inputs
- Semantic HTML structure
- Color contrast compliant (WCAG AA)

## API Reference

### `useFormState()`

Hook for managing form state and persistence:

```ts
const {
  data,              // Current form data
  errors,            // Validation errors
  currentPage,       // Current page (1-5)
  updateField,       // Update form field
  blurField,         // Validate field on blur
  setCurrentPage,    // Navigate to page
  clearForm,         // Reset all data
} = useFormState();
```

### `useFormSubmit()`

Hook for form submission:

```ts
const {
  isSubmitting,      // Is currently submitting
  submitError,       // Error message if failed
  submitSuccess,     // Was submission successful
  submitForm,        // Async function to submit
  resetSubmitState,  // Clear submit state
} = useFormSubmit();
```

## Troubleshooting

### Form not submitting

1. Check that `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL` is set correctly
2. Verify the Apps Script deployment is set to "Anyone" access
3. Check browser console for errors
4. Try the test function in Google Apps Script

### Fields not validating

1. Check the validation schema in `types/form.ts`
2. Verify field names match between component and types
3. Check browser console for TypeScript errors

### Data not saving to localStorage

1. Check browser localStorage is not disabled
2. Verify localStorage quota isn't exceeded
3. Check browser console for storage errors

## Support

For issues or questions:
1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Check [Tailwind CSS docs](https://tailwindcss.com)
3. Review the Google Apps Script template comments
4. Create an issue on GitHub

## License

MIT

## Contact

For questions about the form or deployment, email: mkauffit@gmail.com