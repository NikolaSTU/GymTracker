using System.Collections.Generic;

namespace GymTracker.Infrastructure.RequestDTOs.Templates
{
    public class WorkoutTemplateCreateRequest
    {
        public string Name { get; set; }       
        public string Description { get; set; } 

        public List<TemplateExerciseRequest> Exercises { get; set; }
    }
}
