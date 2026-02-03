using Microsoft.AspNetCore.Mvc;
using GymTracker.Infrastructure.Services;
using GymTracker.Infrastructure.RequestDTOs.Workouts;
using GymTracker.Infrastructure.ResponseDTOs.Workouts;
using Common.Entities;
using System;

namespace GymTracker.Controllers
{
    public class WorkoutController : BaseCrudController<Workout, WorkoutService, WorkoutCreateRequest, WorkoutResponse>
    {
        public WorkoutController(WorkoutService service) : base(service)
        {
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

        [HttpPost("{templateId}")]
        public IActionResult CreateFromTemplate(int templateId)
        {
            try
            {
                int userId = GetLoggedUserId();

                var newWorkout = _service.CreateFromTemplate(templateId, userId);
                return Ok(newWorkout);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public override IActionResult Post([FromBody] WorkoutCreateRequest request)
        {
            request.UserId = GetLoggedUserId(); 
            return base.Post(request);
        }

    }
}