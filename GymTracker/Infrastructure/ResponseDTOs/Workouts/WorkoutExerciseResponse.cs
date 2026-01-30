using System;
using System.Collections.Generic;

namespace GymTracker.Infrastructure.ResponseDTOs.Workouts
{
    public class WorkoutExerciseResponse
    {
        public int Id { get; set; }
        public int ExerciseId { get; set; }
        public string ExerciseName { get; set; }
        public List<SetsEntryResponse> Sets { get; set; }
    }
}
