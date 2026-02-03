using AutoMapper;
using Common.Entities;
using Common.Persistance;
using Common.Services;
using GymTracker.Infrastructure.RequestDTOs.Templates;
using GymTracker.Infrastructure.ResponseDTOs.Templates;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace GymTracker.Infrastructure.Services
{
    public class TemplateService : BaseService<WorkoutTemplate, WorkoutTemplateCreateRequest, WorkoutTemplateResponse>
    {
        public TemplateService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public List<WorkoutTemplateResponse> GetAllForUser(int userId)
        {
            var entities = _db.Set<WorkoutTemplate>()
                .AsNoTracking()
                .Where(w => w.UserId == userId)
                .ToList();

            return _mapper.Map<List<WorkoutTemplateResponse>>(entities);
        }
    }
}
