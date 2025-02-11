import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProcessInfo from "./pages/ProcessInfo";
import AvailablePositions from "./pages/AvailablePositions";
import AdminDashboard from "./pages/AdminDashboard";
import ApplicantsList from "./pages/ApplicantsList";
import EmployeesList from "./pages/EmployeesList";
import NewHiresInventory from "./pages/NewHiresInventory";
import ProcessState from "./pages/ProcessState";
import EmployeeInventory from "./pages/EmployeeInventory";
import Offers from "./pages/Offers";
import OffersList from "./pages/OffersList";
import EmployeeProfile from "./pages/EmployeeProfile";
import AspirantsPage from "./pages/AspirantsPage";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsAuthenticated(true);
      setUsername(storedUser);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home /> } />        
        <Route path="/login" element={<Login />} />        
        <Route path="/process-info" element={<ProcessInfo /> } />
        <Route path="/available-positions" element={<AvailablePositions />} />
        <Route path="/admin-dashboard" element={ <AdminDashboard /> } />
        <Route path="/applicants-list" element={<ApplicantsList />} />
        <Route path="/employees-list" element={<EmployeesList />} />
        <Route path="/hires-inventory" element={<NewHiresInventory />} />
        <Route path="/process-state" element={<ProcessState />} />
        <Route path="/employee-inventory/:id" element={<EmployeeInventory />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/offers-list" element={<OffersList />} />
        <Route path="/employee-profile/:id" element={<EmployeeProfile />} />
        <Route path="/aspirants-page" element={<AspirantsPage />} />
      </Routes>
    </Router>
  );
}
