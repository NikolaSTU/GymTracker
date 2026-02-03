import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaList, FaClipboardList, FaDumbbell } from 'react-icons/fa';

export default function Sidebar() {
  const linkClass = (isActive) => 
    `d-flex align-items-center text-decoration-none text-white p-2 rounded ${ 
      isActive ? 'bg-primary' : 'text-white-50' 
    }`; 

  return (
    <aside className="bg-dark text-white min-vh-100 p-3" style={{ width: 240 }}>
      <div className="mb-4">
        <h4 className="m-0">GymTracker</h4>
      </div>

      <nav className="nav flex-column">
        <NavLink to="/dashboard/exercises" className={({ isActive }) => linkClass(isActive)}>
          <FaList className="me-2" /> Exercises
        </NavLink>

        <NavLink to="/templates" className={({ isActive }) => linkClass(isActive)}>
          <FaClipboardList className="me-2" /> My Templates
        </NavLink>

        <NavLink to="/dashboard/workouts" className={({ isActive }) => linkClass(isActive)}>
          <FaDumbbell className="me-2" /> My Workouts
        </NavLink>
      </nav>
    </aside>
  );
}
