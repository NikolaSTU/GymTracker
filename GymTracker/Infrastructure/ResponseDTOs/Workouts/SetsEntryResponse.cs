using System;

namespace GymTracker.Infrastructure.ResponseDTOs.Workouts
{
    public class SetsEntryResponse
    {
        public int Id { get; set; }
        public float Weight { get; set; }
        public int Reps { get; set; }
    }
}
