using Common.Entities;
using GymTracker.Infrastructure.RequestDTOs.Workouts;
using GymTracker.Infrastructure.ResponseDTOs.Workouts;
using GymTracker.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GymTracker.Controllers
{
    public class WorkoutExercisesController : BaseCrudController<WorkoutExercise, WorkoutExerciseService, WorkoutExerciseRequest, WorkoutExerciseResponse>
    {
        public WorkoutExercisesController(WorkoutExerciseService service) : base(service) { }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public override IActionResult Get()
        {
            return base.Get();
        }
    }
}