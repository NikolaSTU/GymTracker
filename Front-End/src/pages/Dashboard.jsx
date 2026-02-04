import React, { useEffect, useState, useContext, useMemo } from 'react';
import StatCard from '../components/StatCard';
import { FaDumbbell, FaCalendarCheck, FaClipboardList, FaWeightHanging, FaLayerGroup, FaTrophy } from 'react-icons/fa';
import workoutService from '../services/workoutService';
import templateService from '../services/templateService';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const { user, token } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    if (!user) return;
    load();
  }, [user]);

  async function load() {
    try {
      const w = await workoutService.getHistory(token, user.id ?? user.Id);
      setWorkouts(w || []);
    } catch (e) {
      setWorkouts([]);
    }

    try {
      const t = await templateService.getAll(token);
      setTemplates(t || []);
    } catch (e) {
      setTemplates([]);
    }
  }

  const totalWorkouts = workouts.length;
  const now = new Date();
  const workoutsThisMonth = workouts.filter(w => {
    const d = new Date(w.date ?? w.Date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
  const activeTemplates = templates.length;

  const { totalVolume, totalSets, heaviestLift } = useMemo(() => {
    let volume = 0;
    let setsCount = 0;
    let heaviest = 0;

    for (const w of workouts || []) {
      const exercises = w.exercises ?? w.Exercises ?? [];
      for (const ex of exercises) {
        const sets = ex.sets ?? ex.Sets ?? ex.SetsEntries ?? [];
        for (const s of sets) {
          const reps = Number(s.reps ?? s.Reps ?? 0) || 0;
          const weight = Number(s.weight ?? s.Weight ?? 0) || 0;
          setsCount += 1;
          volume += reps * weight;
          if (weight > heaviest) heaviest = weight;
        }
      }
    }

    return { totalVolume: volume, totalSets: setsCount, heaviestLift: heaviest };
  }, [workouts]);

  function formatKg(v) {
    if (!v || v === 0) return '0 kg';
    if (v >= 1000000) return `${(v / 1000000).toFixed(1).replace(/\.0$/, '')}M kg`;
    if (v >= 1000) return `${(v / 1000).toFixed(1).replace(/\.0$/, '')}k kg`;
    return `${Math.round(v)} kg`;
  }

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <StatCard title="Total Workouts" value={totalWorkouts} icon={<FaDumbbell />} color="#2dd4bf" />
        </div>
        <div className="col-md-4 mb-3">
          <StatCard title="This Month" value={workoutsThisMonth} icon={<FaCalendarCheck />} color="#f43f5e" />
        </div>
        <div className="col-md-4 mb-3">
          <StatCard title="Active Templates" value={activeTemplates} icon={<FaClipboardList />} color="#3b82f6" />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <StatCard title="Iron Moved" value={formatKg(totalVolume)} icon={<FaWeightHanging />} color="#8b5cf6" />
        </div>
        <div className="col-md-4 mb-3">
          <StatCard title="Total Sets" value={totalSets} icon={<FaLayerGroup />} color="#f59e0b" />
        </div>
        <div className="col-md-4 mb-3">
          <StatCard title="Heaviest Lift" value={heaviestLift ? `${heaviestLift} kg` : '0 kg'} icon={<FaTrophy />} color="#eab308" />
        </div>
      </div>

      <h3>Welcome to GymTracker</h3>
      <p className="text-muted">Track your workouts, templates and progress.</p>
    </div>
  );
}
