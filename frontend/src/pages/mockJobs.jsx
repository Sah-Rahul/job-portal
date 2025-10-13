import React from "react";
import Layout from "../components/Layout";
import JobCard from "../components/JobCard"; 
import { Input } from "@/components/ui/input";

// --- DUMMY DATA ARRAY IS USED HERE ---

 
const MockJobs = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-8">
        <h2 className="text-3xl font-bold mb-6">Job Listings</h2>
        
        {/* Filter/Search Bar (labeled as "FilterCard" in the image) */}
        <div className="mb-8 max-w-lg">
           {/* Using shadcn/ui Input component */}
           <Input 
              type="text" 
              placeholder="Filter/Search Jobs..." 
              className="w-full"
           />
        </div>

        {/* Responsive Grid for Job Cards */}
        {/* Tailwind CSS grid classes for responsiveness: 1 column on mobile, 2 on medium, 3 on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockJobs.map((job) => (
            <JobCard
              key={job.id}
              companyName={job.companyName}
              location={job.location}
              timePosted={job.timePosted}
              title={job.title}
              description={job.description}
              positions={job.positions}
              jobType={job.jobType}
              salary={job.salary}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MockJobs;