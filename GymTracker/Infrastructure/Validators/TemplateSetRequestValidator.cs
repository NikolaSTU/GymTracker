using FluentValidation;
using GymTracker.Infrastructure.RequestDTOs.Templates;

namespace GymTracker.Infrastructure.Validators
{
    public class TemplateSetRequestValidator : AbstractValidator<TemplateSetRequest>
    {
        public TemplateSetRequestValidator()
        {
            RuleFor(x => x.TargetReps)
                .GreaterThan(0);

            RuleFor(x => x.TargetWeight)
                .GreaterThanOrEqualTo(0);
        }
    }
}
