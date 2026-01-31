using AutoMapper;
using Common.Entities;
using Common.Persistance;
using Common.Services;
using GymTracker.Infrastructure.RequestDTOs.Exercises;
using GymTracker.Infrastructure.ResponseDTOs.Exercises;

namespace GymTracker.Infrastructure.Services
{
    public class TemplateExerciseService : BaseService<TemplateExercise, ExerciseRequest, ExerciseResponse>
    {
        public TemplateExerciseService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
    }
}
