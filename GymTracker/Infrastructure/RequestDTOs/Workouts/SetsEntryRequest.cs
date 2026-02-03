namespace GymTracker.Infrastructure.RequestDTOs.Workouts
{
    public class SetsEntryRequest
    {
        public int Weight { get; set; }
        public int Reps { get; set; }

        public int WorkoutExerciseId { get; set; }
    }
}
