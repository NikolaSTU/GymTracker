using System;
using System.Collections.Generic;

namespace GymTracker.Infrastructure.ResponseDTOs.Templates
{
    public class WorkoutTemplateResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<TemplateExerciseResponse> Exercises { get; set; }
    }
}
