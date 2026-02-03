using Common.Entities;
using GymTracker.Infrastructure.RequestDTOs.Templates;
using GymTracker.Infrastructure.ResponseDTOs.Templates;
using GymTracker.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GymTracker.Controllers
{
    public class TemplateExercisesController : BaseCrudController<TemplateExercise, TemplateExerciseService, TemplateExerciseRequest, TemplateExerciseResponse>
    {
        public TemplateExercisesController(TemplateExerciseService service) : base(service)
        {
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public override IActionResult Get()
        {
            return base.Get();
        }
    }
}
