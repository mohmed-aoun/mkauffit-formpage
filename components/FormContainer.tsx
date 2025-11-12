'use client';

import React, { useState, useEffect } from 'react';
import { Page1Form } from './Page1Form';
import { Page2Form } from './Page2Form';
import { Page3Form } from './Page3Form';
import { Page4Form } from './Page4Form';
import { ThankYouPage } from './ThankYouPage';
import { useFormState } from '@/hooks/useFormState';
import { useFormSubmit } from '@/hooks/useFormSubmit';
import { validatePage } from '@/lib/formValidation';
import { FormData } from '@/types/form';

export const FormContainer: React.FC = () => {
  const {
    data,
    errors,
    currentPage,
    updateField,
    blurField,
    setCurrentPage,
    clearForm,
    resetErrors,
  } = useFormState();

  const { isSubmitting, submitError, submitSuccess, submitForm, resetSubmitState } =
    useFormSubmit();

  const [pageErrors, setPageErrors] = useState<Record<string, string>>({});
  const [showErrorSummary, setShowErrorSummary] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const TOTAL_PAGES = 5;

  // Calculate current page errors
  useEffect(() => {
    if (!hasAttemptedSubmit || currentPage >= TOTAL_PAGES) return;

    const errors = validatePage(currentPage, data as Partial<FormData>);
    setPageErrors(errors);
  }, [data, currentPage, hasAttemptedSubmit]);

  const canAdvance = Object.keys(pageErrors).length === 0;

  const handleNext = async () => {
    setHasAttemptedSubmit(true); // mark that user tried to move on
  
    const errors = validatePage(currentPage, data as Partial<FormData>);
    setPageErrors(errors);
  
    if (Object.keys(errors).length > 0) {
      setShowErrorSummary(true);
      return;
    }
  
    if (currentPage === 4) {
      try {
        await submitForm(data as FormData);
        setCurrentPage(5);
      } catch {
        // handled by hook
      }
    } else {
      setCurrentPage(currentPage + 1);
      setShowErrorSummary(false);
      resetErrors();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setHasAttemptedSubmit(false); // reset for next page
    }
  };


  const handleBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setShowErrorSummary(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackFromThankYou = () => {
    setCurrentPage(1);
    resetSubmitState();
  };

  const handleClearForm = () => {
    if (window.confirm('Are you sure you want to clear the entire form?')) {
      clearForm();
      resetSubmitState();
      setCurrentPage(1);
    }
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 1:
        return (
          <Page1Form
            data={data}
            errors={pageErrors}
            hasAttemptedSubmit={hasAttemptedSubmit}
            onChange={updateField}
            onBlur={blurField}
          />
        );
      case 2:
        return (
          <Page2Form
            data={data}
            errors={pageErrors}
            hasAttemptedSubmit={hasAttemptedSubmit}
            onChange={updateField}
            onBlur={blurField}
          />
        );
      case 3:
        return (
          <Page3Form
            data={data}
            errors={pageErrors}
            hasAttemptedSubmit={hasAttemptedSubmit}
            onChange={updateField}
            onBlur={blurField}
          />
        );
      case 4:
        return (
          <Page4Form
            data={data}
            errors={pageErrors}
            hasAttemptedSubmit={hasAttemptedSubmit}
            onChange={updateField}
            onBlur={blurField}
          />
        );
      case 5:
        return (
          <ThankYouPage
            data={data}
            onBackToForm={handleBackFromThankYou}
            onClearForm={handleClearForm}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Header */}
      <header className="w-full flex items-center justify-center py-6 mb-8 bg-transparent">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <img
            src="/mkauffit-logo.png" // ⬅️ Replace with your logo path (e.g., /images/mk-logo.svg)
            alt="Logo"
            className="w-10 h-10"
          />
          {/* Texts */}
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Matthew Kaufman – Health Coaching: Pre-Consultation Form
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Strength • Nutrition • Mindset
            </p>
          </div>
        </div>
        {/* Gray separator line */}
        <hr className="border-t border-gray-200 mt-4" />
      </header>


      {/* Main Container */}
      <div className="max-w-2xl mx-auto px-5 md:px-10 py-8">
        {/* User Info & Status */}
        {currentPage < TOTAL_PAGES && (
          <div className="bg-white border border-gray-200 p-4 mb-6 rounded-md">
            <div className="flex justify-between items-start">
              <div className="text-sm">
                <span className="text-brand-gray-text">Step {currentPage} of 4</span>
              </div>
              <div className="text-xs text-brand-gray-text">
                Draft in progress
              </div>
            </div>
          </div>
        )}

        {/* Required Fields Indicator */}
        {currentPage < TOTAL_PAGES && currentPage === 1 && (
          <div className="mb-6 text-sm text-red-500">
            * Indicates required field
          </div>
        )}

        {/* Submit Error */}
        {submitError && currentPage < TOTAL_PAGES && (
          <div className="bg-red-50 border border-red-200 p-4 mb-6 rounded-md">
            <p className="text-sm font-medium text-red-700">
              Error submitting form: {submitError}
            </p>
          </div>
        )}

        {/* Page Content */}
        <div className="mb-8">
          {renderPageContent()}
        </div>

        {/* Navigation */}
        {currentPage < TOTAL_PAGES && (
          <div className="border-t border-gray-200 pt-6 flex justify-between items-center">
            <div className="flex gap-3">
              {currentPage > 1 && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 border border-purple-600 text-purple-600 rounded-md text-sm font-medium hover:bg-purple-50 transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={isSubmitting}
                className="px-6 py-2 bg-brand-orange hover:bg-brand-orange-dark text-white rounded-md text-sm font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : currentPage === 4 ? 'Submit' : 'Next'}
              </button>
            </div>
            <button
              onClick={handleClearForm}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors"
            >
              Clear form
            </button>
          </div>
        )}

        {/* Footer Message */}
        <div className="mt-8 text-xs text-gray-500 text-center space-y-1">
          <p>Never submit passwords through web forms.</p>
          <p>
            This content is neither created nor endorsed by Google.{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Report Abuse
            </a>
            {' - '}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Terms of Service
            </a>
            {' - '}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
