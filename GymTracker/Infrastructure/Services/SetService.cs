using AutoMapper;
using Common.Entities;
using Common.Services; 
using Common.Persistance;
using GymTracker.Infrastructure.RequestDTOs.Workouts;
using GymTracker.Infrastructure.ResponseDTOs.Workouts;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace GymTracker.Infrastructure.Services
{
    public class SetService : BaseService<SetsEntry, SetsEntryRequest, SetsEntryResponse>
    {
        public SetService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public override int? GetOwnerId(int id)
        {
            var entity = _db.SetsEntries
                .Include(s => s.WorkoutExercise)
                    .ThenInclude(we => we.Workout)
                .AsNoTracking()
                .FirstOrDefault(s => s.Id == id);

            return entity?.WorkoutExercise?.Workout?.UserId;
        }
    }
}