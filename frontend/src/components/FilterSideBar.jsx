import React, { useState } from "react";
import { MapPin, Briefcase, DollarSign, X } from "lucide-react";

const FilterSideBar = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedSalary, setSelectedSalary] = useState(null);

  const locations = [
    "India",
    "Nepal",
    "China",
    "USA",
    "UK",
    "Germany",
    "Canada",
    "Australia",
    "Singapore",
    "Dubai",
  ];

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "App Developer",
    "UI/UX Designer",
    "Digital Marketing",
    "Full Stack Developer",
    "DevOps Engineer",
    "Data Scientist",
    "Product Manager",
    "QA Engineer",
  ];

  const salaryRanges = [
    "10k - 20k/month",
    "20k - 30k/month",
    "30k - 40k/month",
    "4LPA - 6LPA",
    "6LPA - 8LPA",
    "8LPA - 10LPA",
  ];

  const handleLocationClick = (loc) => {
    setSelectedLocation(loc === selectedLocation ? null : loc);
  };

  const handleRoleClick = (role) => {
    setSelectedRole(role === selectedRole ? null : role);
  };

  const handleSalaryClick = (salary) => {
    setSelectedSalary(salary === selectedSalary ? null : salary);
  };

  const clearAllFilters = () => {
    setSelectedLocation(null);
    setSelectedRole(null);
    setSelectedSalary(null);
  };

  const activeFiltersCount = [
    selectedLocation,
    selectedRole,
    selectedSalary,
  ].filter(Boolean).length;

  return (
    <div className="w-full  py-8 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 p-2 rounded-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Filter by Skills
              </h2>
              {activeFiltersCount > 0 && (
                <p className="text-sm text-gray-600 mt-0.5">
                  {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""}{" "}
                  active
                </p>
              )}
            </div>
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-200 border border-red-200 cursor-pointer"
            >
              <X className="w-4  h-4" />
              Clear All
            </button>
          )}
        </div>

        <div className="space-y-6">
          {/* Location Filters */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-800">Location</h3>
              {selectedLocation && (
                <span className="ml-auto px-2.5 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full ">
                  1 selected
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2.5">
              {locations.map((loc, i) => (
                <button
                  key={i}
                  onClick={() => handleLocationClick(loc)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 cursor-pointer
                  ${
                    selectedLocation === loc
                      ? "bg-purple-600 text-white border-purple-600 shadow-md scale-105"
                      : "bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                  }
                `}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Job Role Filters */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">Job Role</h3>
              {selectedRole && (
                <span className="ml-auto px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  1 selected
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2.5">
              {roles.map((role, i) => (
                <button
                  key={i}
                  onClick={() => handleRoleClick(role)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 cursor-pointer
                  ${
                    selectedRole === role
                      ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                      : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }
                `}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Salary Range Filters */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Salary Range
              </h3>
              {selectedSalary && (
                <span className="ml-auto px-2.5 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  1 selected
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2.5">
              {salaryRanges.map((salary, i) => (
                <button
                  key={i}
                  onClick={() => handleSalaryClick(salary)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 cursor-pointer
                  ${
                    selectedSalary === salary
                      ? "bg-green-600 text-white border-green-600 shadow-md scale-105"
                      : "bg-white text-gray-700 border-gray-200 hover:border-green-300 hover:bg-green-50"
                  }
                `}
                >
                  {salary}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
