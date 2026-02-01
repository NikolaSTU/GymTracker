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

        // overrides 
        [HttpGet("{id}")]
        public override IActionResult GetById(int id)
        {
            var workout = _service.GetById(id);
            if (workout == null) return NotFound();

            if (!IsOwnerOrAdmin(workout.UserId))
            {
                return Unauthorized("This workout does not belong to you.");
            }

            return Ok(workout);
        }

        [HttpDelete("{id}")]
        public override IActionResult Delete(int id)
        {
            var workout = _service.GetById(id);
            if (workout == null) return NotFound();

            if (!IsOwnerOrAdmin(workout.UserId))
            {
                return Unauthorized("You cannot delete someone else's workout.");
            }

            _service.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public override IActionResult Put(int id, [FromBody] WorkoutCreateRequest request)
        {
            var workout = _service.GetById(id);
            if (workout == null) return NotFound();

            if (!IsOwnerOrAdmin(workout.UserId))
            {
                return Unauthorized("You cannot edit someone else's workout.");
            }

            return base.Put(id, request);
        }
       
    }
}