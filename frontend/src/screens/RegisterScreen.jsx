import React, { useState } from "react";
import { FaCamera, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null });
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await fetch("http://localhost:5000/userRegister", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        // alert("User registered successfully!");
        navigate("/login");
        toast.success("Register Successfully");
      } else if (response.status === 400) {
        toast.error("User already exists");
      } else {
        console.error(result.error);
        // alert("Failed to register user.");
        toast.error("Failed to register user");
      }
    } catch (err) {
      console.error("Error submitting the form:", err);
      // alert("Error occurred. Try again later.");
      toast.error("Error occurred. Try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register Form</h2>

        {/* Image Upload Section */}
        <div className="mb-6 flex flex-col items-center">
          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Uploaded Preview"
                className="w-24 h-24 rounded-full object-cover border border-gray-300"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full focus:outline-none"
              >
                <FaTimes />
              </button>
            </div>
          ) : (
            <div className="relative w-24 h-24 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
              <label htmlFor="image" className="cursor-pointer text-gray-500">
                <FaCamera size={24} />
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="hidden"
                required
                onChange={handleImageChange}
              />
            </div>
          )}
        </div>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        {/* Username Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            required
            placeholder="Enter your username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            required
            name="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Create Account
        </button>
        <div className="flex justify-center mt-5">
          Already have an account?&nbsp;
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterScreen;
