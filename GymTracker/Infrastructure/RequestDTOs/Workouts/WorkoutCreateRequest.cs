using System;
using System.Collections.Generic;

namespace GymTracker.Infrastructure.RequestDTOs.Workouts
{
    public class WorkoutCreateRequest
    {
        public DateTime Date { get; set; }

        public List<WorkoutExerciseRequest> Exercises
        {
            get; set;
        }
    }
}
