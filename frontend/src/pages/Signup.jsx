import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Briefcase,
  User,
  Mail,
  Phone,
  Lock,
  Upload,
  Loader2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import { USER_API_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../store/slices/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFormData({ ...formData, file });
  };

  const handleRoleChange = (value) => {
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(setLoading(true));

      const form = new FormData();
      form.append("fullName", formData.fullName);
      form.append("email", formData.email);
      form.append("phoneNumber", formData.phoneNumber);
      form.append("password", formData.password);
      form.append("role", formData.role);
      if (formData.file) {
        form.append("file", formData.file);
      }

      const { data } = await axios.post(`${USER_API_POINT}/register`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log(data);
      toast.success("Signup successful.");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Briefcase className="h-10 w-10 text-purple-600" />
                <span className="text-3xl font-bold">
                  Career<span className="text-purple-600">Hub</span>
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Create your account to get started
              </p>
            </div>

            {/* Signup Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign Up</h2>

              <div className="space-y-5">
                {/* Full Name */}
                <div>
                  <Label
                    htmlFor="fullName"
                    className="text-gray-700 font-medium"
                  >
                    Full Name
                  </Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email
                  </Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <Label
                    htmlFor="phoneNumber"
                    className="text-gray-700 font-medium"
                  >
                    Phone Number
                  </Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="number"
                      placeholder="+977 9812345678"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <Label
                    htmlFor="password"
                    className="text-gray-700 font-medium"
                  >
                    Password
                  </Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <RadioGroup
                    value={formData.role}
                    onValueChange={handleRoleChange}
                    className="flex items-center space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student" />
                      <Label
                        htmlFor="student"
                        className="cursor-pointer font-normal"
                      >
                        Student
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="recruiter" id="recruiter" />
                      <Label
                        htmlFor="recruiter"
                        className="cursor-pointer font-normal"
                      >
                        Recruiter
                      </Label>
                    </div>
                  </RadioGroup>

                  {/* Profile Upload */}
                  <div className="flex items-center">
                    <Label
                      htmlFor="file"
                      className="cursor-pointer flex items-center space-x-2 text-sm text-gray-600 hover:text-purple-600 transition-colors border border-gray-300 rounded-md px-3 py-2"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Profile</span>
                    </Label>
                    <Input
                      id="file"
                      name="file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>

                {formData.file && (
                  <p className="text-xs text-green-600 flex items-center space-x-1">
                    <span>✓</span>
                    <span>{formData.file.name}</span>
                  </p>
                )}

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
                  className="w-full h-11 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-medium text-base"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Signup"
                  )}
                </Button>

                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Signup;
