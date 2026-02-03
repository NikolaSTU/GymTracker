using FluentValidation;
using GymTracker.Infrastructure.RequestDTOs.Templates;

namespace GymTracker.Infrastructure.Validators
{
    public class TemplateExerciseRequestValidator : AbstractValidator<TemplateExerciseRequest>
    {
        public TemplateExerciseRequestValidator()
        {
            RuleFor(x => x.ExerciseId)
                .GreaterThan(0);

            RuleFor(x => x.Sets)
                .NotEmpty();

            RuleForEach(x => x.Sets)
                .SetValidator(new TemplateSetRequestValidator());
        }
    }
}
