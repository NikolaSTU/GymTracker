using System;

namespace GymTracker.Infrastructure.ResponseDTOs.Templates
{
    public class TemplateSetResponse
    {
        public int Id { get; set; }
        public int TargetReps { get; set; }
        public float TargetWeight { get; set; }
    }
}
