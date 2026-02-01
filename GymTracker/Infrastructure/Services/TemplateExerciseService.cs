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
    public class TemplateExerciseService : BaseService<TemplateExercise, TemplateExerciseRequest, TemplateExerciseResponse>
    {
        public TemplateExerciseService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public override int? GetOwnerId(int id)
        {
            var entity = _db.TemplateExercises
                .Include(te => te.WorkoutTemplate)
                .AsNoTracking()
                .FirstOrDefault(te => te.Id == id);

            return entity?.WorkoutTemplate?.UserId;
        }
    }
}