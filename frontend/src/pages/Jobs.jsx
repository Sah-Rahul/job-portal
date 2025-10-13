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
import { Bookmark, Building2 } from "lucide-react";
import Layout from "../components/Layout";
import FilterSideBar from "../components/FilterSideBar";
import { useNavigate } from "react-router-dom";

const mockJobs = [
  {
    id: 1,
    companyName: "Company Name A",
    location: "India",
    timePosted: "2 days ago",
    title: "Frontend Developer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Assumenda eos provident a, dolorem perferendis ducimus deserunt nesciunt quae sequi. Ab?",
    positions: 12,
    jobType: "Part Time",
    salary: "24LPA",
  },
  {
    id: 2,
    companyName: "Company Name B",
    location: "India",
    timePosted: "2 days ago",
    title: "Full Stack Engineer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Assumenda eos provident a, dolorem perferendis ducimus deserunt nesciunt quae sequi. Ab?",
    positions: 5,
    jobType: "Full Time",
    salary: "30LPA",
  },
  {
    id: 3,
    companyName: "Company Name C",
    location: "India",
    timePosted: "1 day ago",
    title: "Backend Developer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Assumenda eos provident a, dolorem perferendis ducimus deserunt nesciunt quae sequi. Ab?",
    positions: 8,
    jobType: "Contract",
    salary: "15LPA",
  },
  {
    id: 4,
    companyName: "Company Name D",
    location: "USA",
    timePosted: "3 hours ago",
    title: "Data Scientist",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Assumenda eos provident a, dolorem perferendis ducimus deserunt nesciunt quae sequi. Ab?",
    positions: 10,
    jobType: "Full Time",
    salary: "45LPA",
  },
  {
    id: 5,
    companyName: "Company Name E",
    location: "India",
    timePosted: "5 days ago",
    title: "UI/UX Designer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Assumenda eos provident a, dolorem perferendis ducimus deserunt nesciunt quae sequi. Ab?",
    positions: 3,
    jobType: "Part Time",
    salary: "18LPA",
  },
  {
    id: 6,
    companyName: "Company Name F",
    location: "India",
    timePosted: "5 days ago",
    title: "DevOps Engineer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Assumenda eos provident a, dolorem perferendis ducimus deserunt nesciunt quae sequi. Ab?",
    positions: 7,
    jobType: "Full Time",
    salary: "28LPA",
  },
];

const Jobs = () => {
  const id = `xvxcvxcvx`
  const navigate = useNavigate();
  return (
    <Layout>
      <div className=" md:flex-row gap-6 px-4 md:px-8 py-8">
        {/* filter  */}
        <FilterSideBar />

        <main className="w-full  ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockJobs.map((job) => (
              <Card
                key={job.id}
                className="flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm text-muted-foreground">
                      {job.timePosted}
                    </p>
                    <Button
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
                      {job.positions} Positions
                    </Badge>
                    <Badge variant="secondary">{job.jobType}</Badge>
                    <Badge className="bg-green-100 text-green-800">
                      {job.salary}
                    </Badge>
                  </div>
                </CardContent>

                <CardFooter className="pt-4 flex justify-start space-x-3">
                  <Button
                    onClick={()=> navigate(`/job/description/${id}`)}
                    variant="outline"
                    className="cursor-pointer text-indigo-600 border-indigo-600 hover:bg-indigo-50"
                  >
                    Details
                  </Button>
                  <Button className="cursor-pointer bg-purple-600 hover:bg-purple-800">
                    Save For Later
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Jobs;
