import React from "react";
import { useLocation } from "react-router-dom";

export default function HomeScreen() {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div>
      <div className="bg-gray-100 flex justify-between px-5 py-3">
        <h1 className="text-2xl">Dashboard</h1>
        <div className="flex gap-4 pr-5 items-center">
          {user ? (
            <p className="text-2xl">{user.username}</p>
          ) : (
            <p className="text-2xl">Guest</p>
          )}
          <button className="border-[1px] rounded-lg px-2 py-2 border-red-600 hover:bg-red-600 text-red-500 hover:text-white">
            Log out
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center mt-20 text-5xl">
        Welcome {user.name}
      </div>
    </div>
  );
}
