using FluentValidation;
using GymTracker.Infrastructure.RequestDTOs.Workouts;

namespace GymTracker.Infrastructure.Validators
{
    public class SetsEntryRequestValidator : AbstractValidator<SetsEntryRequest>
    {
        public SetsEntryRequestValidator()
        {
            RuleFor(x => x.Reps)
                .GreaterThan(0);

            RuleFor(x => x.Weight)
                .GreaterThanOrEqualTo(0);
        }
    }
}
