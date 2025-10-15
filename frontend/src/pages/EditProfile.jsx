import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const EditProfile = ({ user, onClose }) => {
  const [loading, setLoadingState] = useState(false);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    location: "",
    skills: "",
    profileImage: null,
    resumeFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (file?.type === "application/pdf") {
      setFormData((prev) => ({ ...prev, resumeFile: file }));
    } else {
      toast.error("Please upload a PDF file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#00000081] z-[998]"
      ></div>

      <div className="fixed top-0 right-0 h-full w-full max-w-md sm:w-1/3 bg-white shadow-lg z-[999] p-6 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image Preview */}
          <div className="flex flex-col items-center">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover mb-2 border-4 border-purple-200"
              />
            ) : (
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-2">
                {formData.fullName.charAt(0) || "U"}
              </div>
            )}
            <Label
              htmlFor="profile-upload"
              className="cursor-pointer text-sm text-purple-600 hover:text-purple-700"
            >
              Change Photo
            </Label>
            <Input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Inputs */}
          <InputField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextareaField
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
          <InputField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <InputField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          <InputField
            label="Skills (comma separated)"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
          />

          {/* Resume Upload */}
          <div>
            <Label className="font-semibold">Resume (PDF)</Label>
            <Label
              htmlFor="resume-upload"
              className="cursor-pointer border px-4 py-2 inline-block rounded hover:bg-gray-100"
            >
              {formData.resumeFile?.name ||
                user?.profile?.resume ||
                "Upload PDF"}
            </Label>
            <Input
              id="resume-upload"
              type="file"
              accept="application/pdf"
              onChange={handleResumeChange}
              className="hidden"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-purple-600 text-white hover:bg-purple-700"
            >
              {loading ? (
                <LoaderCircle className="animate-spin w-5 h-5" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

const InputField = ({ label, ...props }) => (
  <div>
    <Label className="block font-semibold mb-1">{label}</Label>
    <Input className="w-full h-11" {...props} />
  </div>
);

const TextareaField = ({ label, ...props }) => (
  <div>
    <Label className="block font-semibold mb-1">{label}</Label>
    <textarea
      rows={3}
      className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500"
      {...props}
    />
  </div>
);

export default EditProfile;
