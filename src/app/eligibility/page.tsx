'use client';

import { useState } from 'react';
import Link from 'next/link';

// Sample scheme data with eligibility criteria
const schemes = [
  {
    id: 'pm-kisan',
    title: 'PM-KISAN',
    category: 'Agriculture',
    description: 'Income support for farmer families',
    eligibilityCriteria: {
      occupation: ['farmer'],
      hasLand: true,
      income: null, // No specific income limit
      age: null, // No specific age limit
    },
  },
  {
    id: 'pmjay',
    title: 'Ayushman Bharat (PMJAY)',
    category: 'Healthcare',
    description: 'Health insurance coverage for poor and vulnerable families',
    eligibilityCriteria: {
      income: 'below_poverty_line',
      age: null, // No specific age limit
      occupation: null, // No specific occupation requirement
      hasLand: null, // Not relevant
    },
  },
  {
    id: 'pmay',
    title: 'Pradhan Mantri Awas Yojana',
    category: 'Housing',
    description: 'Affordable housing for urban poor',
    eligibilityCriteria: {
      income: ['low', 'middle'],
      location: 'urban',
      hasHouse: false,
      age: null, // No specific age limit
    },
  },
  {
    id: 'pmuy',
    title: 'Pradhan Mantri Ujjwala Yojana',
    category: 'Energy',
    description: 'LPG connections for women from BPL households',
    eligibilityCriteria: {
      income: 'below_poverty_line',
      gender: 'female',
      hasLPG: false,
      age: null, // No specific age limit
    },
  },
  {
    id: 'pmfby',
    title: 'Pradhan Mantri Fasal Bima Yojana',
    category: 'Agriculture',
    description: 'Crop insurance for farmers',
    eligibilityCriteria: {
      occupation: ['farmer'],
      hasLand: true,
      growsNotifiedCrops: true,
      age: null, // No specific age limit
    },
  },
  {
    id: 'pmmy',
    title: 'Pradhan Mantri Mudra Yojana',
    category: 'Finance',
    description: 'Loans for small businesses',
    eligibilityCriteria: {
      occupation: ['business_owner', 'entrepreneur', 'self_employed'],
      businessType: 'small_micro',
      age: null, // No specific age limit
      income: null, // No specific income limit
    },
  },
];

export default function EligibilityPage() {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    occupation: '',
    income: '',
    location: '',
    hasLand: '',
    hasHouse: '',
    hasLPG: '',
    growsNotifiedCrops: '',
    businessType: '',
  });

  const [results, setResults] = useState<typeof schemes>([]);
  const [showResults, setShowResults] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple eligibility checking logic
    const eligibleSchemes = schemes.filter(scheme => {
      const criteria = scheme.eligibilityCriteria;
      let isEligible = true;
      
      // Check occupation
      if (criteria.occupation && formData.occupation) {
        if (Array.isArray(criteria.occupation)) {
          isEligible = isEligible && criteria.occupation.includes(formData.occupation);
        } else {
          isEligible = isEligible && criteria.occupation === formData.occupation;
        }
      }
      
      // Check income
      if (criteria.income && formData.income) {
        if (Array.isArray(criteria.income)) {
          isEligible = isEligible && criteria.income.includes(formData.income);
        } else {
          isEligible = isEligible && criteria.income === formData.income;
        }
      }
      
      // Check location
      if (criteria.location && formData.location) {
        isEligible = isEligible && criteria.location === formData.location;
      }
      
      // Check gender
      if (criteria.gender && formData.gender) {
        isEligible = isEligible && criteria.gender === formData.gender;
      }
      
      // Check land ownership
      if (criteria.hasLand !== null && formData.hasLand) {
        isEligible = isEligible && criteria.hasLand === (formData.hasLand === 'yes');
      }
      
      // Check house ownership
      if (criteria.hasHouse !== null && formData.hasHouse) {
        isEligible = isEligible && criteria.hasHouse === (formData.hasHouse === 'yes');
      }
      
      // Check LPG connection
      if (criteria.hasLPG !== null && formData.hasLPG) {
        isEligible = isEligible && criteria.hasLPG === (formData.hasLPG === 'yes');
      }
      
      // Check if grows notified crops
      if (criteria.growsNotifiedCrops && formData.growsNotifiedCrops) {
        isEligible = isEligible && criteria.growsNotifiedCrops === (formData.growsNotifiedCrops === 'yes');
      }
      
      // Check business type
      if (criteria.businessType && formData.businessType) {
        isEligible = isEligible && criteria.businessType === formData.businessType;
      }
      
      return isEligible;
    });
    
    setResults(eligibleSchemes);
    setShowResults(true);
  };

  const resetForm = () => {
    setFormData({
      age: '',
      gender: '',
      occupation: '',
      income: '',
      location: '',
      hasLand: '',
      hasHouse: '',
      hasLPG: '',
      growsNotifiedCrops: '',
      businessType: '',
    });
    setShowResults(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Check Your Eligibility</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Answer a few questions to find government schemes you may be eligible for.
          </p>
        </div>

        {!showResults ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your age"
                    />
                  </div>
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                    <select
                      id="occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select occupation</option>
                      <option value="farmer">Farmer</option>
                      <option value="business_owner">Business Owner</option>
                      <option value="entrepreneur">Entrepreneur</option>
                      <option value="self_employed">Self-employed</option>
                      <option value="salaried">Salaried Employee</option>
                      <option value="unemployed">Unemployed</option>
                      <option value="student">Student</option>
                      <option value="retired">Retired</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">Income Level</label>
                    <select
                      id="income"
                      name="income"
                      value={formData.income}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select income level</option>
                      <option value="below_poverty_line">Below Poverty Line</option>
                      <option value="low">Low Income</option>
                      <option value="middle">Middle Income</option>
                      <option value="high">High Income</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <select
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select location</option>
                      <option value="urban">Urban</option>
                      <option value="rural">Rural</option>
                    </select>
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="hasLand" className="block text-sm font-medium text-gray-700 mb-1">Do you own agricultural land?</label>
                    <select
                      id="hasLand"
                      name="hasLand"
                      value={formData.hasLand}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select an option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="hasHouse" className="block text-sm font-medium text-gray-700 mb-1">Do you own a house?</label>
                    <select
                      id="hasHouse"
                      name="hasHouse"
                      value={formData.hasHouse}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select an option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="hasLPG" className="block text-sm font-medium text-gray-700 mb-1">Do you have an LPG connection?</label>
                    <select
                      id="hasLPG"
                      name="hasLPG"
                      value={formData.hasLPG}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select an option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="growsNotifiedCrops" className="block text-sm font-medium text-gray-700 mb-1">Do you grow notified crops?</label>
                    <select
                      id="growsNotifiedCrops"
                      name="growsNotifiedCrops"
                      value={formData.growsNotifiedCrops}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select an option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">Business Type (if applicable)</label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select business type</option>
                      <option value="small_micro">Small/Micro Enterprise</option>
                      <option value="medium">Medium Enterprise</option>
                      <option value="large">Large Enterprise</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mr-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Check Eligibility
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Eligibility Results</h2>
                <button
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Start Over
                </button>
              </div>
              
              {results.length > 0 ? (
                <div>
                  <p className="text-green-600 font-medium mb-4">
                    Based on your information, you may be eligible for the following schemes:
                  </p>
                  <div className="space-y-4">
                    {results.map(scheme => (
                      <div key={scheme.id} className="border border-gray-200 rounded-md p-4 hover:bg-gray-50">
                        <h3 className="text-lg font-medium text-gray-900">{scheme.title}</h3>
                        <p className="text-gray-600 mb-2">{scheme.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{scheme.category}</span>
                          <Link 
                            href={`/schemes/${scheme.id}`}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
                          >
                            View Details
                            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No matching schemes found</h3>
                  <p className="mt-1 text-gray-500">
                    Based on the information provided, we couldn&apos;t find any schemes you&apos;re eligible for. Try adjusting your criteria or contact us for assistance.
                  </p>
                  <div className="mt-6">
                    <Link 
                      href="/schemes"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Browse All Schemes
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Disclaimer</h3>
              <p className="text-gray-600 text-sm">
                This eligibility check is based on the information you provided and is meant to be a guide only. The final eligibility determination will be made by the respective government departments. Please refer to the official websites for the most accurate and up-to-date information.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Need Assistance?</h3>
              <p className="text-gray-600 mb-4">
                Our team can help you understand your eligibility for various government schemes and guide you through the application process.
              </p>
              <Link 
                href="/contact"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Contact Us
              </Link>
            </div>
            <div className="md:w-1/3 mt-6 md:mt-0 md:pl-8">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500 mb-2">Did You Know?</div>
                <p className="text-gray-700 text-sm">
                  Many citizens are eligible for multiple government schemes but don&apos;t apply because they&apos;re unaware of them. Our eligibility checker helps bridge this information gap.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}