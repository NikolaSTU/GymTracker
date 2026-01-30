using System.Collections.Generic;

namespace GymTracker.Infrastructure.RequestDTOs.Workouts
{
    public class WorkoutExerciseRequest
    {
        public int ExerciseId { get; set; }
        public List<SetsEntryRequest> Sets { get; set; }
    }
}
