using Common.Entities;
using GymTracker.Infrastructure.RequestDTOs.Workouts;
using GymTracker.Infrastructure.ResponseDTOs.Workouts;
using GymTracker.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace GymTracker.Controllers
{
    public class WorkoutController : BaseCrudController<Workout, WorkoutService, WorkoutCreateRequest, WorkoutResponse>
    {
        public WorkoutController(WorkoutService service) : base(service)
        {
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public override IActionResult Get()
        {
            return base.Get();
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetByUser(int userId)
        {

            if (!IsOwnerOrAdmin(userId))
            {
                return Unauthorized("You cannot view another user's workouts.");
            }

            var result = _service.GetAllForUser(userId);
            return Ok(result);
        }

        [HttpPost("FromTemplate")]
        public IActionResult CreateFromTemplate([FromBody] WorkoutFromTemplateRequest request)
        {
            int userId = GetLoggedUserId();

            var newWorkout = _service.CreateFromTemplate(request, userId);

            return Ok(newWorkout);
        }
        [HttpPost]
        public override IActionResult Post([FromBody] WorkoutCreateRequest request)
        {
            int userId = GetLoggedUserId();

            var createdWorkout = _service.Create(request, userId);

            return Ok(createdWorkout);
        }

    }
}