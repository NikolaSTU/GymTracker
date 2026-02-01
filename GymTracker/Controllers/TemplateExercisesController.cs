using Microsoft.AspNetCore.Mvc;
using GymTracker.Infrastructure.Services;
using GymTracker.Infrastructure.RequestDTOs.Templates;
using GymTracker.Infrastructure.ResponseDTOs.Templates;
using Common.Entities;

namespace GymTracker.Controllers
{
    public class TemplateExercisesController : BaseCrudController<TemplateExercise, TemplateExerciseService, TemplateExerciseRequest, TemplateExerciseResponse>
    {
        public TemplateExercisesController(TemplateExerciseService service) : base(service)
        {
        }
    }
}
