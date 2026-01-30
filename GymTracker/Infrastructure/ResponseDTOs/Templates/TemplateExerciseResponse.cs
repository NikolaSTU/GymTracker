using System;
using System.Collections.Generic;

namespace GymTracker.Infrastructure.ResponseDTOs.Templates
{
    public class TemplateExerciseResponse
    {
        public int Id { get; set; }
        public int ExerciseId { get; set; }
        public string ExerciseName { get; set; }
        public List<TemplateSetResponse> Sets { get; set; }
    }
}
