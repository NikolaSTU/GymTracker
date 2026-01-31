using AutoMapper;
using Common.Entities;
using Common.Persistance;
using Common.Services;
using GymTracker.Infrastructure.RequestDTOs.Exercises;
using GymTracker.Infrastructure.ResponseDTOs.Exercises;

namespace GymTracker.Infrastructure.Services
{
    public class UserService : BaseService<Exercise, ExerciseRequest, ExerciseResponse>
    {
        public UserService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
     
    }
}
