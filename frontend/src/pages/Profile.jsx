import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Mail,
  Phone,
  Edit2,
  FileText,
  Briefcase,
  Calendar,
  Building2,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  MapPin,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "../components/Layout";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const [isEditing, setIsEditing] = useState(false);

  // Sample user data - replace with actual Redux data
  const userData = {
    fullName: "Full Name",
    bio: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure dignissimos reprehenderit ducimus.",
    email: "rahul@gmail.com",
    phone: "9844556600",
    location: "Kathmandu, Nepal",
    skills: ["Html", "Css", "Javascript", "Reactjs", "Node.js", "MongoDB"],
    resumeUrl: "Rahul Sah",
    profileImage: null,
  };

  // Sample applied jobs data
  const appliedJobs = [
    {
      id: 1,
      date: "17-07-2025",
      jobRole: "Frontend Developer",
      company: "Google",
      status: "Selected",
      location: "Nepalgunj",
      salary: "18 LPA",
    },
    {
      id: 2,
      date: "17-07-2025",
      jobRole: "Frontend Developer",
      company: "Google",
      status: "Selected",
      location: "Dharan",
      salary: "20 LPA",
    },
    {
      id: 3,
      date: "15-07-2025",
      jobRole: "Backend Developer",
      company: "Microsoft",
      status: "Pending",
      location: "Biratnagar",
      salary: "22 LPA",
    },
    {
      id: 5,
      date: "12-07-2025",
      jobRole: "Full Stack Developer",
      company: "Amazon",
      status: "Rejected",
      location: "Pokhara",
      salary: "25 LPA",
    },
    {
      id: 5,
      date: "10-07-2025",
      jobRole: "UI/UX Designer",
      company: "Netflix",
      status: "Pending",
      location: "Birgunj",
      salary: "15 LPA",
    },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      Selected: {
        variant: "default",
        className: "bg-green-500 hover:bg-green-600 text-white",
        icon: <CheckCircle className="w-3.5 h-3.5" />,
      },
      Pending: {
        variant: "secondary",
        className: "bg-yellow-500 hover:bg-yellow-600 text-white",
        icon: <Clock className="w-3.5 h-3.5" />,
      },
      Rejected: {
        variant: "destructive",
        className: "bg-red-500 hover:bg-red-600 text-white",
        icon: <XCircle className="w-3.5 h-3.5" />,
      },
    };

    const config = statusConfig[status] || statusConfig.Pending;

    return (
      <Badge className={`${config.className} gap-1.5`}>
        {config.icon}
        {status}
      </Badge>
    );
  };

  return (
    <>
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-8 px-5 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Profile Card */}
            <Card className="overflow-hidden border-0 shadow-2xl">
              {/* Header Background */}
              <div className="h-40 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 relative">
                <div className="absolute inset-0 bg-black opacity-10"></div>
              </div>

              <CardContent className="px-6 sm:px-8 pb-8 pt-0">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-20 mb-8">
                  {/* Avatar */}
                  <div className="relative group">
                    <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-purple-400 via-purple-500 to-blue-500 border-4 border-white shadow-2xl flex items-center justify-center overflow-hidden">
                      {userData.profileImage ? (
                        <img
                          src={userData.profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg
                          className="w-20 h-20 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Name and Bio */}
                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
                      <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                          {userData.fullName}
                        </h1>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{userData.location}</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => setIsEditing(!isEditing)}
                        className="bg-purple-500 hover:bg-purple-600 text-white shadow-lg"
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </div>
                    <p className="text-gray-600 text-base max-w-3xl">
                      {userData.bio}
                    </p>
                  </div>
                </div>

                {/* Contact Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <Card className="border-purple-100 bg-gradient-to-br from-purple-50 to-white">
                    <CardContent className="flex items-center gap-4 p-5">
                      <div className="p-3 bg-purple-500 rounded-xl shadow-md">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">
                          Email Address
                        </p>
                        <p className="text-base font-bold text-gray-900">
                          {userData.email}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-white">
                    <CardContent className="flex items-center gap-4 p-5">
                      <div className="p-3 bg-blue-500 rounded-xl shadow-md">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">
                          Phone Number
                        </p>
                        <p className="text-base font-bold text-gray-900">
                          {userData.phone}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Skills Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                    Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {userData.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Resume Section */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                    Resume
                  </h3>
                  <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl">
                    <Download className="w-5 h-5 mr-2" />
                    Download {userData.resumeUrl}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Applied Jobs Section with Shadcn Table */}
            <Card className="border-0 shadow-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl">
                      <Briefcase className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold">
                        Applied Jobs
                      </CardTitle>
                      <p className="text-purple-100 mt-1">
                        Track your job applications
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-white text-purple-600 hover:bg-gray-100 px-4 py-2 text-base font-bold">
                    {appliedJobs.length} Applications
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {/* Desktop Table View */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="font-bold text-gray-700">
                          Date Applied
                        </TableHead>
                        <TableHead className="font-bold text-gray-700">
                          Job Role
                        </TableHead>
                        <TableHead className="font-bold text-gray-700">
                          Company
                        </TableHead>
                        <TableHead className="font-bold text-gray-700">
                          Location
                        </TableHead>
                        <TableHead className="font-bold text-gray-700">
                          Salary
                        </TableHead>
                        <TableHead className="font-bold text-gray-700">
                          Status
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appliedJobs.map((job, index) => (
                        <TableRow
                          key={job.id}
                          className={`${
                            index % 2 === 0 ? "bg-white" : "bg-purple-50/30"
                          } hover:bg-purple-50 transition-colors`}
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="font-medium text-gray-900">
                                {job.date}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4 text-purple-500" />
                              <span className="font-bold text-gray-900">
                                {job.jobRole}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-blue-500" />
                              <span className="font-semibold text-gray-700">
                                {job.company}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-green-500" />
                              <span className="text-gray-600">
                                {job.location}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="border-purple-500 text-purple-700 font-semibold"
                            >
                              {job.salary}
                            </Badge>
                          </TableCell>
                          <TableCell>{getStatusBadge(job.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-gray-200">
                  {appliedJobs.map((job) => (
                    <Card
                      key={job.id}
                      className="border-0 rounded-none shadow-none hover:bg-purple-50 transition-colors"
                    >
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-5 h-5 text-purple-500" />
                              <h3 className="font-bold text-gray-900 text-lg">
                                {job.jobRole}
                              </h3>
                            </div>
                            {getStatusBadge(job.status)}
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-700">
                              <Building2 className="w-4 h-4 text-blue-500" />
                              <span className="font-semibold">
                                {job.company}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="w-4 h-4 text-green-500" />
                              <span className="text-sm">{job.location}</span>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">{job.date}</span>
                              </div>
                              <Badge
                                variant="outline"
                                className="border-purple-500 text-purple-700 font-semibold"
                              >
                                {job.salary}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;