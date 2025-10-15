import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { USER_API_POINT, BASE_URL } from "../utils/constant";
import { setUser } from "../store/slices/authSlice";

const EditProfile = ({ onClose }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    location: "",
    skills: "",
    file: null,
    resume: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.profile?.bio || "",
        location: user.location || "",
        skills: user.profile?.skills?.join(", ") || "",
        file: null,
        resume: null,
      });

      if (user.profile?.avatar) {
        setPreview(`${BASE_URL}/${user.profile.avatar.replace("public/", "")}`);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file }));

      
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (file?.type === "application/pdf") {
      setFormData((prev) => ({ ...prev, resume: file }));
    } else {
      toast.error("Please upload a PDF file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("bio", formData.bio);
      data.append("location", formData.location);
      data.append("skills", formData.skills);

      if (formData.file) data.append("avatar", formData.file);  
      if (formData.resume) data.append("resume", formData.resume);

      const response = await axios.put(
        `${USER_API_POINT}/update-profile`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      toast.success(response.data.message || "Profile updated");

      dispatch(setUser(response.data.user));
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/40 z-[998]" />
      <div className="fixed top-0 right-0 h-full w-full max-w-md sm:w-1/3 bg-white z-[999] p-6 overflow-y-auto shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
          {/* Profile Photo */}
          <div className="flex  relative flex-col items-center">
            {preview ? (
              <img
                src={preview}
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover mb-2 border-4 border-purple-200"
              />
            ) : (
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-2">
                {formData.fullName.charAt(0)}
              </div>
            )}

            <Input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className=" absolute top-0 left-[115px] w-32 h-32  opacity-0 cursor-pointer"
            />
          </div>

          {/* Input Fields */}
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
              {formData.resume?.name ||
                user?.profile?.resume?.split("/").pop() ||
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
