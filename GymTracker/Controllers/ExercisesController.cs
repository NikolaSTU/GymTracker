using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using GymTracker.Infrastructure.Services;
using GymTracker.Infrastructure.RequestDTOs.Exercises;
using GymTracker.Infrastructure.ResponseDTOs.Exercises;
using Common.Entities;

namespace GymTracker.Controllers
{
    public class ExercisesController : BaseCrudController<Exercise, ExerciseService, ExerciseRequest, ExerciseResponse>
    {
        public ExercisesController(ExerciseService service) : base(service)
        {
        }

        [HttpGet]
        [AllowAnonymous]
        public override IActionResult Get()
        {
            return base.Get();
        }

        [Authorize(Roles = "Admin")]
        public override IActionResult Post([FromBody] ExerciseRequest request)
        {
            return base.Post(request);
        }


        [Authorize(Roles = "Admin")]
        public override IActionResult Put(int id, [FromBody] ExerciseRequest request)
        {
            return base.Put(id, request);
        }

        [Authorize(Roles = "Admin")]
        public override IActionResult Delete(int id)
        {
            return base.Delete(id);
        }
    }
}
