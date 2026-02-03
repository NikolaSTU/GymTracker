import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => (
  <div className="container mt-5">
    <h1>Login</h1>
  </div>
);

const Dashboard = () => (
  <div className="container mt-5">
    <h1>Dashboard</h1>
  </div>
);

const MyWorkouts = () => (
  <div className="container mt-5">
    <h1>My Workouts</h1>
  </div>
);

const AdminUsers = () => (
  <div className="container mt-5">
    <h1>Admin Users</h1>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/workouts" element={<MyWorkouts />} />
        <Route path="/dashboard/admin" element={<AdminUsers />} />
      </Routes>
    </BrowserRouter>
  );
}
