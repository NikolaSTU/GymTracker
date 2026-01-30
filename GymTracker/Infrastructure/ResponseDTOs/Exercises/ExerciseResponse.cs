using System;

namespace GymTracker.Infrastructure.ResponseDTOs.Exercises
{
    public class ExerciseResponse // gives back exercises
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
