using Common.Entities;
using GymTracker.Infrastructure.RequestDTOs.Templates;
using GymTracker.Infrastructure.ResponseDTOs.Templates;
using GymTracker.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GymTracker.Controllers
{
    public class TemplateSetsController : BaseCrudController<TemplateSet, TemplateSetService, TemplateSetRequest, TemplateSetResponse>
    {
        public TemplateSetsController(TemplateSetService service) : base(service)
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
