using AutoMapper;
using Common.Entities;
using Common.Services;
using Common.Persistance;
using GymTracker.Infrastructure.RequestDTOs.Templates;
using GymTracker.Infrastructure.ResponseDTOs.Templates;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace GymTracker.Infrastructure.Services
{
    public class TemplateSetService : BaseService<TemplateSet, TemplateSetRequest, TemplateSetResponse>
    {
        public TemplateSetService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public override int? GetOwnerId(int id)
        {
            var entity = _db.TemplateSets
                .Include(ts => ts.TemplateExercise)
                    .ThenInclude(te => te.WorkoutTemplate)
                .AsNoTracking()
                .FirstOrDefault(ts => ts.Id == id);

            return entity?.TemplateExercise?.WorkoutTemplate?.UserId;
        }
    }
}