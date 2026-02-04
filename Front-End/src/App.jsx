import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import MyWorkouts from './pages/MyWorkouts';
import AdminUsers from './pages/AdminUsers';
import Exercises from './pages/Exercises';
import Templates from './pages/Templates';
import CreateTemplate from './pages/CreateTemplate';
import ActiveWorkout from './pages/ActiveWorkout';
import WorkoutDetails from './pages/WorkoutDetails';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/workouts"
            element={
              <ProtectedRoute>
                <Layout>
                  <MyWorkouts />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/workout/active/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <ActiveWorkout />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/workout/history/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <WorkoutDetails />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/exercises"
            element={
              <ProtectedRoute>
                <Layout>
                  <Exercises />
                </Layout>
              </ProtectedRoute>
            }
          />
          {/* support old URL /dashboard/templates by redirecting to /templates */}
          <Route
            path="/dashboard/templates"
            element={<Navigate to="/templates" replace />}
          />
          <Route
            path="/templates"
            element={
              <ProtectedRoute>
                <Layout>
                  <Templates />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/templates/create"
            element={
              <ProtectedRoute>
                <Layout>
                  <CreateTemplate />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/templates/edit/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <CreateTemplate />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute>
                <Layout>
                  <AdminUsers />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <Layout>
                  <AdminUsers />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
