using System;
using System.Collections.Generic;

namespace GymTracker.Infrastructure.ResponseDTOs.Workouts
{
    public class WorkoutResponse
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public List<WorkoutExerciseResponse> Exercises { get; set; }
    }
}
