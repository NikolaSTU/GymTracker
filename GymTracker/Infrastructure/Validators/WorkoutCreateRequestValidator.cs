using System;
using FluentValidation;
using GymTracker.Infrastructure.RequestDTOs.Workouts;

namespace GymTracker.Infrastructure.Validators
{
    public class WorkoutCreateRequestValidator : AbstractValidator<WorkoutCreateRequest>
    {
        public WorkoutCreateRequestValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .MaximumLength(100);

            RuleFor(x => x.Date)
                .Must(date => date <= DateTime.Now)
                .WithMessage("Date cannot be in the future.");


            RuleForEach(x => x.Exercises)
                .SetValidator(new WorkoutExerciseRequestValidator());
        }
    }
}
