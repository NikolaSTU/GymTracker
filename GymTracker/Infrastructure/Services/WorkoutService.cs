using AutoMapper;
using Common.Entities;
using Common.Persistance;
using Common.Services;
using GymTracker.Infrastructure.RequestDTOs.Workouts;
using GymTracker.Infrastructure.ResponseDTOs.Workouts;

namespace GymTracker.Infrastructure.Services
{
    public class WorkoutService : BaseService<Workout, WorkoutCreateRequest, WorkoutResponse>
    {
        public WorkoutService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
    }
}
