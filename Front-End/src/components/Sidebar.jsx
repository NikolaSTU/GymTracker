import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaList, FaClipboardList, FaDumbbell, FaPlay, FaUser, FaHome } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import workoutService from '../services/workoutService';

export default function Sidebar() {
  const { token, activeWorkoutId, setActiveWorkout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const linkClass = (isActive) =>
    `d-flex align-items-center text-decoration-none text-white p-2 rounded ${
      isActive ? 'bg-primary' : 'text-white-50'
    }`;

  async function startEmpty() {
    if (activeWorkoutId) {
      alert('Please finish or delete your current active workout before starting a new one.');
      return;
    }
    try {
      const created = await workoutService.startEmpty(token);
      const newId = created?.id ?? created?.Id;
      if (newId) {
        try { setActiveWorkout(newId); } catch {}
        navigate(`/workout/active/${newId}`);
      }
    } catch (err) {
      alert(err.message || 'Failed to start workout');
    }
  }

  return (
    <aside className="bg-dark text-white min-vh-100 p-3" style={{ width: 240 }}>
      <div className="mb-4">
        <h4 className="m-0">GymTracker</h4>
      </div>

      <nav className="nav flex-column">
        <NavLink to="/dashboard" end className={({ isActive }) => linkClass(isActive)}>
          <FaHome className="me-2" /> Dashboard
        </NavLink>

        <NavLink to="/dashboard/exercises" className={({ isActive }) => linkClass(isActive)}>
          <FaList className="me-2" /> Exercises
        </NavLink>

        <NavLink to="/templates" className={({ isActive }) => linkClass(isActive)}>
          <FaClipboardList className="me-2" /> My Templates
        </NavLink>

        <NavLink to="/dashboard/workouts" className={({ isActive }) => linkClass(isActive)}>
          <FaDumbbell className="me-2" /> My Workouts
        </NavLink>

        {/** Manage Users visible to Admin only */}
        {user?.role === 'Admin' && (
          <NavLink to="/admin/users" className={({ isActive }) => linkClass(isActive)}>
            <FaUser className="me-2" /> Manage Users
          </NavLink>
        )}

        

        {!activeWorkoutId && (
          <button className="btn btn-sm btn-primary mt-3" onClick={startEmpty}>
            <FaPlay className="me-2" /> Start Empty Workout
          </button>
        )}
        {activeWorkoutId && (
          <NavLink to={`/workout/active/${activeWorkoutId}`} className={({ isActive }) => linkClass(isActive)}>
            <FaPlay className="me-2" /> Active Workout
          </NavLink>
        )}
      </nav>
    </aside>
  );
}
