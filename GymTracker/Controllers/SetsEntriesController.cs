using Microsoft.AspNetCore.Mvc;
using GymTracker.Infrastructure.Services;
using GymTracker.Infrastructure.RequestDTOs.Workouts;
using GymTracker.Infrastructure.ResponseDTOs.Workouts;
using Common.Entities;

namespace GymTracker.Controllers
{
    public class SetsEntriesController : BaseCrudController<SetsEntry, SetService, SetsEntryRequest, SetsEntryResponse>
    {
        public SetsEntriesController(SetService service) : base(service)
        {
        }
    }
}
