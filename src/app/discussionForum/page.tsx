'use client'
import React, { useState } from 'react';

const StepProgressBar = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const steps = [
    { id: 1, label: 'Scheme Information' },
    { id: 2, label: 'Scheme List' },
    { id: 3, label: 'Fill the Discussion in Forum' },
    { id: 4, label: 'Fill the Personal Details' },
    { id: 5, label: 'Fill the Contact Details' },
    { id: 6, label: 'Upload Document' },
    { id: 7, label: 'Complete' }
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepId: number) => {
    if (stepId <= currentStep) {
      setCurrentStep(stepId);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      {/* Screen Reader Progress Announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Step {currentStep} of {steps.length}: {steps[currentStep - 1].label}
      </div>

      {/* Progress Bar */}
      <nav aria-label="Progress" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={steps.length}>
        <div className="relative mb-8 px-6">
          {/* Background Progress Line */}
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-300 z-0" aria-hidden="true">
            {/* Active Progress Line */}
            <div 
              className="h-full bg-gray-800 transition-all duration-500 ease-in-out"
              style={{ 
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`
              }}
              aria-hidden="true"
            />
          </div>

          <ol className="flex justify-between items-start list-none">
            {steps.map((step) => (
              <li key={step.id} className="flex flex-col items-center relative">
                {/* Circle */}
                <button
                  onClick={() => goToStep(step.id)}
                  disabled={step.id > currentStep}
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg relative z-10 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300
                    ${step.id <= currentStep 
                      ? 'bg-gray-800 shadow-lg hover:bg-gray-700' 
                      : 'bg-gray-300 cursor-not-allowed'
                    }
                    ${step.id === currentStep ? 'ring-4 ring-blue-200' : ''}
                  `}
                  aria-label={`${step.id <= currentStep ? 'Go to' : ''} Step ${step.id}: ${step.label}${step.id === currentStep ? ' (current)' : ''}${step.id < currentStep ? ' (completed)' : ''}`}
                  aria-current={step.id === currentStep ? 'step' : undefined}
                >
                  {step.id <= currentStep ? (
                    step.id < currentStep ? (
                      // Checkmark for completed steps
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      // Current step number
                      <span aria-hidden="true">{step.id}</span>
                    )
                  ) : (
                    // Future step number
                    <span aria-hidden="true">{step.id}</span>
                  )}
                </button>

                {/* Label */}
                <span
                  className={`
                    text-center mt-4 text-sm font-medium leading-tight max-w-28
                    ${step.id <= currentStep 
                      ? 'text-gray-800' 
                      : 'text-gray-500'
                    }
                  `}
                  id={`step-${step.id}-label`}
                >
                  {step.label}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* Content Section */}
      <main>
        <div className="border-t border-gray-200 pt-8">
          <div className="bg-gray-50 rounded-lg p-6 min-h-96">
            <h1 className="text-xl font-semibold text-gray-800 mb-6" id="step-heading">
              {steps[currentStep - 1].label}
            </h1>
            
            {/* Step 1: Scheme Information */}
            {currentStep === 1 && (
              <form className="space-y-4" noValidate>
                <div>
                  <label htmlFor="scheme-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Scheme Name <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="scheme-name"
                    name="schemeName"
                    required
                    aria-describedby="scheme-name-error"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter scheme name"
                  />
                  <div id="scheme-name-error" className="sr-only" aria-live="polite"></div>
                </div>
                <div>
                  <label htmlFor="scheme-type" className="block text-sm font-medium text-gray-700 mb-2">
                    Scheme Type <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <select 
                    id="scheme-type" 
                    name="schemeType" 
                    required
                    aria-describedby="scheme-type-error"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select scheme type</option>
                    <option value="government">Government Scheme</option>
                    <option value="private">Private Scheme</option>
                    <option value="corporate">Corporate Scheme</option>
                  </select>
                  <div id="scheme-type-error" className="sr-only" aria-live="polite"></div>
                </div>
                <div>
                  <label htmlFor="scheme-description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="scheme-description"
                    name="schemeDescription"
                    rows={4}
                    aria-describedby="scheme-description-help"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter scheme description"
                  />
                  <div id="scheme-description-help" className="text-xs text-gray-500 mt-1">
                    Provide a brief description of the scheme (optional)
                  </div>
                </div>
              </form>
            )}

            {/* Step 2: Scheme List */}
            {currentStep === 2 && (
              <form className="space-y-4" noValidate>
                <fieldset>
                  <legend className="block text-sm font-medium text-gray-700 mb-2">
                    Available Schemes <span className="text-red-500" aria-label="required">*</span>
                  </legend>
                  <div role="group" aria-describedby="schemes-help">
                    {['Health Insurance Scheme', 'Education Grant Scheme', 'Housing Loan Scheme'].map((scheme, index) => (
                      <div key={index} className="flex items-center space-x-3 mb-3">
                        <input
                          type="checkbox"
                          id={`scheme-${index}`}
                          name="availableSchemes"
                          value={scheme}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`scheme-${index}`} className="text-sm text-gray-700">
                          {scheme}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div id="schemes-help" className="text-xs text-gray-500 mt-1">
                    Select one or more schemes that apply to you
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level <span className="text-red-500" aria-label="required">*</span>
                  </legend>
                  <div role="radiogroup" aria-describedby="priority-help" className="flex space-x-4">
                    {['High', 'Medium', 'Low'].map((priority) => (
                      <label key={priority} className="flex items-center">
                        <input
                          type="radio"
                          name="priority"
                          value={priority.toLowerCase()}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{priority}</span>
                      </label>
                    ))}
                  </div>
                  <div id="priority-help" className="text-xs text-gray-500 mt-1">
                    Select the priority level for your application
                  </div>
                </fieldset>
              </form>
            )}

            {/* Step 3: Fill the Discussion in Forum */}
            {currentStep === 3 && (
              <form className="space-y-4" noValidate>
                <div>
                  <label htmlFor="discussion-topic" className="block text-sm font-medium text-gray-700 mb-2">
                    Discussion Topic <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="discussion-topic"
                    name="discussionTopic"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter discussion topic"
                  />
                </div>
                <div>
                  <label htmlFor="forum-message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <textarea
                    id="forum-message"
                    name="forumMessage"
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Share your thoughts and questions about the scheme..."
                  />
                </div>
                <div>
                  <label htmlFor="message-category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <select 
                    id="message-category" 
                    name="messageCategory" 
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="general">General Discussion</option>
                    <option value="technical">Technical Support</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
              </form>
            )}

            {/* Step 4: Fill the Personal Details */}
            {currentStep === 4 && (
              <form className="space-y-4" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      name="firstName"
                      required
                      autoComplete="given-name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      name="lastName"
                      required
                      autoComplete="family-name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="date-of-birth" className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <input
                    type="date"
                    id="date-of-birth"
                    name="dateOfBirth"
                    required
                    autoComplete="bday"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <fieldset>
                  <legend className="block text-sm font-medium text-gray-700 mb-2">
                    Gender <span className="text-red-500" aria-label="required">*</span>
                  </legend>
                  <div role="radiogroup" className="flex space-x-4">
                    {['Male', 'Female', 'Other'].map((gender) => (
                      <label key={gender} className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value={gender.toLowerCase()}
                          required
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{gender}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </form>
            )}

            {/* Step 5: Fill the Contact Details */}
            {currentStep === 5 && (
              <form className="space-y-4" noValidate>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    autoComplete="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Address <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    required
                    autoComplete="street-address"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your address"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      City <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      autoComplete="address-level2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <label htmlFor="pin-code" className="block text-sm font-medium text-gray-700 mb-2">
                      PIN Code <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="pin-code"
                      name="pinCode"
                      required
                      autoComplete="postal-code"
                      pattern="[0-9]{6}"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter PIN code"
                    />
                  </div>
                </div>
              </form>
            )}

            {/* Step 6: Upload Document */}
            {currentStep === 6 && (
              <form className="space-y-4" noValidate>
                <div>
                  <label htmlFor="identity-proof" className="block text-sm font-medium text-gray-700 mb-2">
                    Identity Proof <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
                    <input 
                      type="file" 
                      id="identity-proof" 
                      name="identityProof"
                      required
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="sr-only" 
                      aria-describedby="identity-proof-help"
                    />
                    <label htmlFor="identity-proof" className="cursor-pointer block">
                      <div className="text-gray-500">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="mt-2 text-sm font-medium">Click to upload identity proof</p>
                        <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
                      </div>
                    </label>
                  </div>
                  <div id="identity-proof-help" className="text-xs text-gray-500 mt-1">
                    Upload a clear copy of your government-issued ID
                  </div>
                </div>
                <div>
                  <label htmlFor="address-proof" className="block text-sm font-medium text-gray-700 mb-2">
                    Address Proof <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
                    <input 
                      type="file" 
                      id="address-proof" 
                      name="addressProof"
                      required
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="sr-only"
                      aria-describedby="address-proof-help"
                    />
                    <label htmlFor="address-proof" className="cursor-pointer block">
                      <div className="text-gray-500">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="mt-2 text-sm font-medium">Click to upload address proof</p>
                        <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
                      </div>
                    </label>
                  </div>
                  <div id="address-proof-help" className="text-xs text-gray-500 mt-1">
                    Upload utility bill, bank statement, or other address verification document
                  </div>
                </div>
              </form>
            )}

            {/* Step 7: Complete */}
            {currentStep === 7 && (
              <div className="text-center py-8" role="status" aria-live="polite">
                <svg className="mx-auto h-16 w-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Application Completed!
                </h2>
                <p className="text-gray-600 mb-6">
                  Your application has been submitted successfully. You will receive a confirmation email shortly.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left" role="region" aria-labelledby="summary-heading">
                  <h3 id="summary-heading" className="font-medium text-blue-800 mb-2">Application Summary:</h3>
                  <dl className="text-sm text-blue-700 space-y-1">
                    <div className="flex">
                      <dt className="font-medium">Application ID:</dt>
                      <dd className="ml-2">APP-2024-001</dd>
                    </div>
                    <div className="flex">
                      <dt className="font-medium">Submission Date:</dt>
                      <dd className="ml-2">{new Date().toLocaleDateString()}</dd>
                    </div>
                    <div className="flex">
                      <dt className="font-medium">Status:</dt>
                      <dd className="ml-2">Under Review</dd>
                    </div>
                    <div className="flex">
                      <dt className="font-medium">Expected Processing Time:</dt>
                      <dd className="ml-2">7-10 business days</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Navigation Buttons */}
      <div className="flex justify-center space-x-4 pt-8" role="group" aria-label="Step navigation">
        <button
          onClick={previousStep}
          disabled={currentStep === 1}
          className={`
            px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300
            ${currentStep === 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600 hover:-translate-y-0.5 shadow-md hover:shadow-lg'
            }
          `}
          aria-label={`Go to previous step${currentStep > 1 ? `: ${steps[currentStep - 2].label}` : ''}`}
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep === steps.length}
          className={`
            px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300
            ${currentStep === steps.length
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600 hover:-translate-y-0.5 shadow-md hover:shadow-lg'
            }
          `}
          aria-label={`${currentStep === steps.length ? 'Application completed' : `Go to next step: ${steps[currentStep].label}`}`}
        >
          {currentStep === steps.length ? 'Completed' : 'Next'}
        </button>
      </div>
    </div>
  );
};

// Example usage in a Next.js page
const StepProgressPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <header>
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Application Progress
          </h1>
        </header>
        <StepProgressBar />
      </div>
    </div>
  );
};

export default StepProgressPage;