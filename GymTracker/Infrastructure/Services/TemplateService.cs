using AutoMapper;
using Common.Entities;
using Common.Persistance;
using Common.Services;
using GymTracker.Infrastructure.RequestDTOs.Templates;
using GymTracker.Infrastructure.ResponseDTOs.Templates;

namespace GymTracker.Infrastructure.Services
{
    public class TemplateService : BaseService<WorkoutTemplate, WorkoutTemplateCreateRequest, WorkoutTemplateResponse>
    {
        public TemplateService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
    }
}
