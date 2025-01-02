import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomeScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching user data...");
        const response = await fetch("http://localhost:5000/profile", {
          credentials: "include", // Include credentials (cookies) in the request
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("User data received:", data);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Error fetching user data</div>;
  }

  return (
    <div>
      <div className="bg-gray-100 flex justify-between px-5 py-3">
        <h1 className="text-2xl">Dashboard</h1>
        <div className="flex gap-4 pr-5 items-center">
          <p className="text-2xl">{user.username || "Guest"}</p>
          <Link to="/login">
            <button className="border-[1px] rounded-lg px-2 py-2 border-red-600 hover:bg-red-600 text-red-500 hover:text-white">
              Log out
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center mt-20">
        <img
          src={`data:${user.contentType};base64,${user.image}`}
          alt={user.name}
          className="w-32 h-32 rounded-full mb-4"
        />
        <div className="text-5xl">Welcome {user.name}</div>
      </div>
    </div>
  );
}
