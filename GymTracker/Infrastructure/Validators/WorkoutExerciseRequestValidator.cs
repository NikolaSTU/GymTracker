using FluentValidation;
using GymTracker.Infrastructure.RequestDTOs.Workouts;

namespace GymTracker.Infrastructure.Validators
{
    public class WorkoutExerciseRequestValidator : AbstractValidator<WorkoutExerciseRequest>
    {
        public WorkoutExerciseRequestValidator()
        {
            RuleFor(x => x.ExerciseId)
                .GreaterThan(0);

            RuleForEach(x => x.Sets)
                .SetValidator(new SetsEntryRequestValidator());
        }
    }
}
