"use client";

import React, { ChangeEvent, FC, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { loginInterface } from "@/interfaceTypes/register.interface";
import { registerSchema } from "@/validation/registerSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const Login: FC = () => {
  const [formData, setFormData] = useState<loginInterface>({
    email: "",
    password: "",
  });

  console.log(formData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof loginInterface, string>>
  >({});

  const [showPassword, setShowPassword] = useState(false);

  const handleInput = (field: keyof loginInterface, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof loginInterface;
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
            className="absolute right-3 top-7 text-gray-500 hover:text-gray-700 cursor-pointer focus:outline-none"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <Button type="submit" className="cursor-pointer w-full">
          Login
        </Button>
      </form>

      <p className="text-sm text-center mt-4">
        I have don't account?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          {" "}
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
