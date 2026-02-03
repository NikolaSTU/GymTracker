using System.Collections.Generic;

namespace GymTracker.Infrastructure.RequestDTOs.Templates
{
    public class WorkoutTemplateCreateRequest
    {
        public string Name { get; set; }       
        public string Description { get; set; }

        [System.Text.Json.Serialization.JsonIgnore]
        public int UserId { get; set; }
        public List<TemplateExerciseRequest> Exercises { get; set; }
    }
}
