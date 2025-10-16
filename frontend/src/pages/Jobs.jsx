import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Building2, Loader2 } from "lucide-react";
import Layout from "../components/Layout";
import FilterSideBar from "../components/FilterSideBar";
import { useNavigate } from "react-router-dom";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { useSelector } from "react-redux";

const Jobs = () => {
  const navigate = useNavigate();
  useGetAllJobs();

  const allJobs = useSelector((state) => state.job.alljob);

  return (
    <Layout>
      <div className="md:flex-row gap-6 px-4 md:px-8 py-8">
        <FilterSideBar />

        <main className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs.length === 0 ? (
              <Loader2 />
            ) : (
              allJobs.map((job) => (
                <Card
                  key={job._id}
                  className="flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm text-muted-foreground">
                        {job.timePosted || "Recently Posted"}
                      </p>
                      <Button
                      onClick={() => alert('sd')}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Building2 className="h-6 w-6 text-indigo-500" />
                      <div>
                        <CardTitle className="text-lg font-semibold">
                          {job.companyName}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {job.location}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-2">
                    
                    <h3 className="text-base font-bold mb-2">{job.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-indigo-100 text-indigo-700">
                        {job.positions || 1} Positions
                      </Badge>
                      <Badge variant="secondary">{job.jobType}</Badge>
                      <Badge className="bg-green-100 text-green-800">
                        {job.salary}
                      </Badge>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-4 flex justify-start space-x-3">
                    <Button
                      onClick={() => navigate(`/job/description/${job._id}`)}
                      variant="outline"
                      className="cursor-pointer text-indigo-600 border-indigo-600 hover:bg-indigo-50"
                    >
                      Details
                    </Button>
                    <Button className="cursor-pointer bg-purple-600 hover:bg-purple-800">
                     Apply Job
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Jobs;
