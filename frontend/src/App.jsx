import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import { Navigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Alert from "./components/Alert";

export default function App() {
  return (
    <Router>
      <div>
        <Alert />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/home" element={<HomeScreen />} />
        </Routes>
      </div>
    </Router>
  );
}
