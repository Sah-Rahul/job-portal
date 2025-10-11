"use client";

import React, { ChangeEvent, FC, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { RegisterInterface } from "@/interfaceTypes/register.interface";
import { registerSchema } from "@/validation/registerSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const Register: FC = () => {
  const [formData, setFormData] = useState<RegisterInterface>({
    name: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "applicant",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterInterface, string>>
  >({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInput = (field: keyof RegisterInterface, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof RegisterInterface;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
    } else {
      console.log("✅ Valid form data:", result.data);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-2">
        Join Our TalentLink
      </h2>
      <p className="text-sm text-center mb-6 text-muted-foreground">
        Create your account to get started
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          <Label className="mb-1" htmlFor="name">
            Full Name
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInput("name", e.target.value)
            }
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Username */}
        <div>
          <Label className="mb-1" htmlFor="userName">
            Username
          </Label>
          <Input
            id="userName"
            value={formData.userName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInput("userName", e.target.value)
            }
            placeholder="Choose a username"
          />
          {errors.userName && (
            <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label className="mb-1" htmlFor="email">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInput("email", e.target.value)
            }
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <Label className="mb-1" htmlFor="role">
            I am a
          </Label>
          <Select
            value={formData.role}
            onValueChange={(value) =>
              handleInput("role", value as "applicant" | "recruiter")
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applicant">Job Applicant</SelectItem>
              <SelectItem value="recruiter">Recruiter</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <Label className="mb-1" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInput("password", e.target.value)
            }
            placeholder="Create a strong password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-6.5 cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <Label className="mb-1" htmlFor="confirmPassword">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInput("confirmPassword", e.target.value)
            }
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-6.5 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
            tabIndex={-1}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <Button type="submit" className="cursor-pointer w-full">
          Create Account
        </Button>
      </form>

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
