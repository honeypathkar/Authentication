import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginScreen() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field Name: ${name}, Field Value: ${value}`); // Debugging log
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/userLogin", {
        method: "POST",
        credentials: "include", // Important for cookies
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        // Navigate to home page after successful login
        navigate("/home", { state: { user: formData }, replace: true });

        // Clear history to prevent going back to the login screen
        window.history.pushState(null, document.title, location.href);
      } else {
        alert(result.error || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again later.");
    }
  };

  useEffect(() => {
    // Prevent going back to the login screen after login
    window.history.pushState(null, document.title, location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, location.href);
    });

    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener("popstate", function (event) {
        window.history.pushState(null, document.title, location.href);
      });
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login Form</h2>

        {/* Username Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.username}
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
          Login
        </button>
        <div className="flex justify-center mt-5">
          Don't Have an Account? &nbsp;
          <Link to="/register" className="text-blue-500">
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginScreen;
