import React from "react";
import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  BookmarkPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { useSelector } from "react-redux";

const LatestJob = () => {
  const navigate = useNavigate();

  useGetAllJobs();

  const allJobs = useSelector((state) => state.job.alljob);
  const loading = useSelector((state) => state.job.loading);

  const getDaysAgo = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - createdDate);
    let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      diffDays = 1;
    }

    return diffDays;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 animate-fade-in">
        <h2 className="text-4xl font-bold mb-2">
          <span className="text-purple-600">Job Openings</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-20 text-gray-500">
            <span className="text-lg animate-pulse">Loading jobs...</span>
          </div>
        ) : allJobs.length === 0 ? (
          <div className="col-span-full text-center py-20 text-gray-500">
            No jobs found.
          </div>
        ) : (
          allJobs.map((job, index) => (
            <div
              key={job._id}
              className="rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 group hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Header */}

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {job.company?.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    {job.location}
                  </div>
                </div>
                <button className="text-gray-400 hover:text-purple-600 transition-colors">
                  {job?.createdAt
                    ? `${getDaysAgo(job.createdAt)} days ago`
                    : "Date unknown"}
                </button>
              </div>

              <h4 className="text-xl font-bold text-gray-900 mb-3">
                {job.title}
              </h4>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge
                  variant="outline"
                  className="text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100"
                >
                  <Briefcase className="h-3 w-3 mr-1" />
                  {job.positions} Positions
                </Badge>
                <Badge
                  variant="outline"
                  className="text-red-600 border-red-200 bg-red-50 hover:bg-red-100"
                >
                  <Clock className="h-3 w-3 mr-1" />
                  {job?.jobType}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-purple-600 border-purple-200 bg-purple-50 hover:bg-purple-100"
                >
                  <DollarSign className="h-3 w-3 mr-1" />
                  {job.salary}
                </Badge>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <Button
                  variant="outline"
                  className="flex-1 cursor-pointer border-purple-200 text-purple-600 hover:bg-purple-50"
                  onClick={() => navigate(`/job/description/${job._id}`)}
                >
                  Details
                </Button>
                <Button className="flex-1 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white">
                  Apply Now
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slide-up {
          opacity: 0;
          animation: slideUp 0.6s ease-out forwards;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default LatestJob;
