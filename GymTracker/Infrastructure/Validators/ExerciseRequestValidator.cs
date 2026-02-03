using FluentValidation;
using GymTracker.Infrastructure.RequestDTOs.Exercises;

namespace GymTracker.Infrastructure.Validators
{
    public class ExerciseRequestValidator : AbstractValidator<ExerciseRequest>
    {
        public ExerciseRequestValidator()
        {
            RuleFor(x => x.ExerciseName)
                .NotEmpty()
                .MaximumLength(100);

            RuleFor(x => x.ExerciseDesc)
                .MaximumLength(500)
                .When(x => !string.IsNullOrEmpty(x.ExerciseDesc));
        }
    }
}
