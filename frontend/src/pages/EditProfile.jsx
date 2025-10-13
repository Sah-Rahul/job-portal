import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { UPDATE_USER_INFO } from "../utils/constant";
import toast from "react-hot-toast";
import { setUser } from "../store/slices/authSlice";
import Cookies from "js-cookie";

const EditProfile = ({ onClose, onSave }) => {
  const { user, token } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    bio: user?.bio || "",
    phone: user?.phone || "",
    location: user?.profile?.location || "",
    skills: user?.profile?.skills?.join(", ") || "",
    profileImage: user?.profileImage || null,
    profileImageFile: null,
    resumeFile: null,
  });

  const [preview, setPreview] = useState(formData.profileImage);

  useEffect(() => {
    if (formData.profileImageFile) {
      const objectUrl = URL.createObjectURL(formData.profileImageFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(formData.profileImage);
    }
  }, [formData.profileImageFile, formData.profileImage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        profileImageFile: e.target.files[0],
      }));
    }
  };

  const handleResumeChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        resumeFile: e.target.files[0],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      payload.append("fullName", formData.fullName);
      payload.append("email", formData.email);
      payload.append("phoneNumber", formData.phone);
      payload.append("bio", formData.bio);
      payload.append("skills", formData.skills);

      if (formData.profileImageFile) {
        payload.append("file", formData.profileImageFile);
      }
      const token = Cookies.get("token");
      console.log(token);
      if (!token) {
        toast.error("User not authenticated. Please login again.");
        setLoading(false);
        return;
      }

      const { data } = await axios.put(
        `UPDATE_USER_INFO/update-profile`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (data.success) {
        dispatch(setUser(data.data));
        toast.success("Profile updated successfully!");
        onSave(data);
        onClose();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#00000081] bg-opacity-40 z-[998]"
      ></div>

      <div className="fixed top-0 right-0 h-full w-full max-w-md sm:w-1/3 bg-white shadow-lg z-[999] p-6 sm:p-8 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute text-4xl top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Preview */}
          <div className="flex flex-col items-center relative">
            {preview ? (
              <img
                src={preview}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mb-2 border"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                No Image
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute opacity-0 w-32 h-32 cursor-pointer top-10 left-24"
            />
          </div>

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
            name="phone"
            type="tel"
            value={formData.phone}
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
            placeholder="HTML, CSS, JavaScript"
          />

          <div>
            <label className="block font-semibold mb-2">Resume (PDF)</label>
            <label
              htmlFor="resume-upload"
              className="cursor-pointer border px-4 py-2 inline-flex items-center gap-2 hover:bg-gray-100 rounded"
            >
              📄 {formData.resumeFile ? formData.resumeFile.name : "Upload PDF"}
            </label>
            <input
              id="resume-upload"
              type="file"
              accept="application/pdf"
              onChange={handleResumeChange}
              className="hidden"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

// Reusable InputField component
const InputField = ({ label, ...props }) => (
  <div>
    <label className="block font-semibold mb-1">{label}</label>
    <input className="w-full border rounded px-3 py-2" {...props} />
  </div>
);

// Reusable TextareaField component
const TextareaField = ({ label, ...props }) => (
  <div>
    <label className="block font-semibold mb-1">{label}</label>
    <textarea rows={3} className="w-full border rounded px-3 py-2" {...props} />
  </div>
);

export default EditProfile;
