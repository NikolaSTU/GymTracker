using Microsoft.AspNetCore.Mvc;
using GymTracker.Infrastructure.Services;
using GymTracker.Infrastructure.RequestDTOs.Workouts;
using GymTracker.Infrastructure.ResponseDTOs.Workouts;
using Common.Entities;

namespace GymTracker.Controllers
{
    public class WorkoutExercisesController : BaseCrudController<WorkoutExercise, WorkoutExerciseService, WorkoutExerciseRequest, WorkoutExerciseResponse>
    {
        public WorkoutExercisesController(WorkoutExerciseService service) : base(service) { }

    }
}