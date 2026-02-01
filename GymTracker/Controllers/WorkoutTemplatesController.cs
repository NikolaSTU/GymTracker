using Microsoft.AspNetCore.Mvc;
using GymTracker.Infrastructure.Services;
using GymTracker.Infrastructure.RequestDTOs.Templates;
using GymTracker.Infrastructure.ResponseDTOs.Templates;
using Common.Entities;

namespace GymTracker.Controllers
{
    public class WorkoutTemplatesController : BaseCrudController<WorkoutTemplate, TemplateService,
                WorkoutTemplateCreateRequest, WorkoutTemplateResponse>
    {
        public WorkoutTemplatesController(TemplateService service) : base(service)
        {
        }
    }
}
