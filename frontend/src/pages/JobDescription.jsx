import React from "react";
import { useSelector } from "react-redux";
import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Users,
  Calendar,
  CheckCircle,
} from "lucide-react";
import Layout from "../components/Layout";

const JobDescription = () => {
  const { user } = useSelector((store) => store.auth);

  // Sample job data - replace with actual data from props or Redux
  const jobData = {
    title: "Frontend Developer",
    positions: 12,
    jobType: "Part Time",
    salary: "24LPA",
    role: "Frontend Developer",
    location: "Hyderabad",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium similique sed dolor!",
    experience: "2 yrs",
    salaryRange: "12LPA",
    totalApplicants: 4,
    postedDate: "17-07-2024",
    alreadyApplied: false,
  };

  const handleApply = () => {
    if (user) {
      // Handle job application logic
      console.log("Applying for job...");
    } else {
      // Redirect to login
      console.log("Please login first");
    }
  };

  return (
    <>
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 sm:px-8 py-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {jobData.title}
                  </h1>
                  <div className="flex  flex-wrap gap-3">
                    <span className="px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm text-black text-sm font-medium rounded-full border border-white border-opacity-30">
                      {jobData.positions} Positions
                    </span>
                    <span className="px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm text-black text-sm font-medium rounded-full border border-white border-opacity-30">
                      {jobData.jobType}
                    </span>
                    <span className="px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm text-black text-sm font-medium rounded-full border border-white border-opacity-30">
                      {jobData.salary}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleApply}
                  disabled={jobData.alreadyApplied || !user}
                  className={`px-8 py-3 rounded-xl font-semibold text-base transition-all duration-200 shadow-lg
                ${
                  jobData.alreadyApplied
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-white text-purple-600 hover:bg-gray-50 hover:shadow-xl transform hover:scale-105"
                }
              `}
                >
                  {jobData.alreadyApplied ? "Already Applied" : "Apply Now"}
                </button>
              </div>
            </div>

            <div className="px-6 sm:px-8 py-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-purple-600" />
                Job Description
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Role */}
                <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Role:
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {jobData.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Location:
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {jobData.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Experience:
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {jobData.experience}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                  <div className="p-2 bg-amber-600 rounded-lg">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Salary:
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {jobData.salaryRange}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-100">
                  <div className="p-2 bg-pink-600 rounded-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Total Applicants:
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {jobData.totalApplicants}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-100">
                  <div className="p-2 bg-teal-600 rounded-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Posted Date:
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {jobData.postedDate}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                  Description:
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {jobData.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default JobDescription;
