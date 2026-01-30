using System.Collections.Generic;

namespace GymTracker.Infrastructure.RequestDTOs.Templates
{
    public class TemplateExerciseRequest
    {
        public int ExerciseId { get; set; }
        public List<TemplateSetRequest> Sets { get; set; }
    }
}
