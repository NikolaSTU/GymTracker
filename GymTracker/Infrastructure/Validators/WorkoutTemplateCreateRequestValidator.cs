using FluentValidation;
using GymTracker.Infrastructure.RequestDTOs.Templates;

namespace GymTracker.Infrastructure.Validators
{
    public class WorkoutTemplateCreateRequestValidator : AbstractValidator<WorkoutTemplateCreateRequest>
    {
        public WorkoutTemplateCreateRequestValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty();

            RuleFor(x => x.Exercises)
                .NotEmpty();

            RuleForEach(x => x.Exercises)
                .SetValidator(new TemplateExerciseRequestValidator());
        }
    }
}
