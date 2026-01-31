using AutoMapper;
using Common.Entities;
using Common.Persistance;
using Common.Services;
using GymTracker.Infrastructure.RequestDTOs.Workouts;
using GymTracker.Infrastructure.ResponseDTOs.Workouts;

namespace GymTracker.Infrastructure.Services
{
    public class SetService : BaseService<SetsEntry, SetsEntryRequest, SetsEntryResponse>
    {
        public SetService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
    }
}
