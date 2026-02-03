using System;

namespace GymTracker.Infrastructure.RequestDTOs.Workouts
{
    public class WorkoutFromTemplateRequest
    {
        public int TemplateId { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }

    }
}
