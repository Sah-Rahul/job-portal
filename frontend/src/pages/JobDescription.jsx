import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
import { setJobLoading } from "../store/slices/jobSlice";
import axios from "axios";
import { APPLY_JOB } from "../utils/constant";
import toast from "react-hot-toast";

const JobDescription = () => {
  const { id } = useParams();
  const { user } = useSelector((store) => store.auth);
  const { alljob } = useSelector((store) => store.job);

  const [jobData, setJobData] = useState(null);
  const dispatch = useDispatch();

  const getDaysAgo = (date) => {
    const createdDate = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - createdDate);
    let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 0 ? 1 : diffDays;
  };

  useEffect(() => {
    if (alljob && id) {
      const foundJob = alljob.find((job) => job._id === id);
      if (foundJob) {
        const parsedJob = {
          ...foundJob,
          role: foundJob.title,
          experience: `${foundJob.experienceLevel} yrs`,
          salaryRange: `${foundJob.salary} INR`,
          totalApplicants: foundJob.applications?.length || 0,
          postedDate: `${getDaysAgo(foundJob.createdAt)} days ago`,
          alreadyApplied: foundJob.applications?.some(
            (app) => app.userId === user?._id
          ),
          requirements: Array.isArray(foundJob.requirements)
            ? foundJob.requirements
            : foundJob.requirements?.split(",").map((r) => r.trim()) || [],
        };
        setJobData(parsedJob);
      }
    }
  }, [alljob, id, user]);

  const handleApply = async () => {
    if (!user?.token) {
      toast.error("Please login to apply.");
      return;
    }

    try {
      dispatch(setJobLoading(true));

      await axios.post(
        `${APPLY_JOB}/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success("Applied for job successfully.");
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized. Please log in again.");
      } else {
        toast.error("Something went wrong while applying.");
      }
    } finally {
      dispatch(setJobLoading(false));
    }
  };

  if (!jobData) {
    return (
      <Layout>
        <div className="text-center text-gray-500 py-20">Loading job...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 sm:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {jobData.title}
                </h1>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm text-black text-sm font-medium rounded-full border border-white border-opacity-30">
                    {jobData.position} Positions
                  </span>
                  <span className="px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm text-black text-sm font-medium rounded-full border border-white border-opacity-30">
                    {jobData.jobType}
                  </span>
                  <span className="px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm text-black text-sm font-medium rounded-full border border-white border-opacity-30">
                    {jobData.salaryRange}
                  </span>
                </div>
              </div>
              <button
                onClick={handleApply}
                disabled={jobData.alreadyApplied || !user}
                className={`px-8 py-3 cursor-pointer rounded-xl font-semibold text-base transition-all duration-200 shadow-lg
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
              <InfoCard
                icon={<Briefcase />}
                label="Role"
                value={jobData.role}
              />
              <InfoCard
                icon={<MapPin />}
                label="Location"
                value={jobData.location}
              />
              <InfoCard
                icon={<Clock />}
                label="Experience"
                value={jobData.experience}
              />
              <InfoCard
                icon={<DollarSign />}
                label="Salary"
                value={jobData.salaryRange}
              />
              <InfoCard
                icon={<Users />}
                label="Total Applicants"
                value={jobData.totalApplicants}
              />
              <InfoCard
                icon={<Calendar />}
                label="Posted"
                value={jobData.postedDate}
              />
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                Description:
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {jobData.description}
              </p>

              {jobData.requirements?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                    Requirements:
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {jobData.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Reusable InfoCard Component
const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100">
    <div className="p-2 bg-purple-600 rounded-lg text-white">
      {React.cloneElement(icon, { className: "w-5 h-5" })}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-600 mb-1">{label}:</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

export default JobDescription;
