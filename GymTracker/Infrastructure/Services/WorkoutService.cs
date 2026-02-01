using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Common.Entities;
using Common.Persistance;
using Common.Services;
using GymTracker.Infrastructure.RequestDTOs.Workouts; 
using GymTracker.Infrastructure.ResponseDTOs.Workouts;

namespace GymTracker.Infrastructure.Services
{
    public class WorkoutService : BaseService<Workout, WorkoutCreateRequest, WorkoutResponse>
    {
        public WorkoutService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public WorkoutResponse CreateFromTemplate(int templateId, int userId)
        {
            var template = _db.WorkoutTemplates
                .Include(t => t.TemplateExercises)
                    .ThenInclude(te => te.TemplateSets)
                .AsNoTracking()
                .FirstOrDefault(t => t.Id == templateId);

            if (template == null)
            {
                throw new Exception($"Workout Template with ID {templateId} not found.");
            }

            var newWorkout = new Workout
            {
                UserId = userId,
                Date = DateTime.Now,
                WorkoutExercises = new List<WorkoutExercise>()
            };

            foreach (var templateEx in template.TemplateExercises)
            {
                var workoutExercise = new WorkoutExercise
                {
                    ExerciseId = templateEx.ExerciseId,
                    OrderIndex = templateEx.OrderIndex,
                    SetsEntries = new List<SetsEntry>()
                };

                foreach (var templateSet in templateEx.TemplateSets)
                {
                    workoutExercise.SetsEntries.Add(new SetsEntry
                    {
                        Reps = templateSet.TargetReps,
                        Weight = templateSet.TargetWeight
                    });
                }

                newWorkout.WorkoutExercises.Add(workoutExercise);
            }

            _dbSet.Add(newWorkout);
            _db.SaveChanges(); 

            return _mapper.Map<WorkoutResponse>(newWorkout);
        }

        public List<WorkoutResponse> GetAllForUser(int userId)
        {
            var workouts = _db.Workouts
                .Where(w => w.UserId == userId)
                .Include(w => w.WorkoutExercises)
                    .ThenInclude(we => we.SetsEntries)
                .ToList();

            return _mapper.Map<List<WorkoutResponse>>(workouts);
        }
    }
}