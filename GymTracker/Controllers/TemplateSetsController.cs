using Microsoft.AspNetCore.Mvc;
using GymTracker.Infrastructure.Services;
using GymTracker.Infrastructure.RequestDTOs.Templates;
using GymTracker.Infrastructure.ResponseDTOs.Templates;
using Common.Entities;

namespace GymTracker.Controllers
{
    public class TemplateSetsController : BaseCrudController<TemplateSet, TemplateSetService, TemplateSetRequest, TemplateSetResponse>
    {
        public TemplateSetsController(TemplateSetService service) : base(service)
        {
        }
    }
}
