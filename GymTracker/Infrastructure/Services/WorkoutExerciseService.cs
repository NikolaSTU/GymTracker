using AutoMapper;
using Common.Entities;
using Common.Persistance;
using Common.Services;
using GymTracker.Infrastructure.RequestDTOs.Workouts;
using GymTracker.Infrastructure.ResponseDTOs.Workouts;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace GymTracker.Infrastructure.Services
{
    public class WorkoutExerciseService : BaseService<WorkoutExercise, WorkoutExerciseRequest, WorkoutExerciseResponse>
    {
        public WorkoutExerciseService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public override int? GetOwnerId(int workoutExerciseId)
        {
            var entity = _db.WorkoutExercises
                .Include(we => we.Workout) 
                .FirstOrDefault(we => we.Id == workoutExerciseId);

            return entity?.Workout?.UserId;
        }
    }
}
