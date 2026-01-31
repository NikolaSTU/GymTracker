using AutoMapper;
using Common.Entities;
using Common.Persistance;
using Common.Services;
using GymTracker.Infrastructure.RequestDTOs.Workouts;
using GymTracker.Infrastructure.ResponseDTOs.Workouts;

namespace GymTracker.Infrastructure.Services
{
    public class WorkoutExerciseService : BaseService<WorkoutExercise, WorkoutExerciseRequest, WorkoutExerciseResponse>
    {
        public WorkoutExerciseService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
    }
}
