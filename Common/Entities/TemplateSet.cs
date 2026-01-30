using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entities
{
    public class TemplateSet : BaseEntity
    {
        public int TemplateExerciseId { get; set; }
        public int TargetReps { get; set; }
        public float TargetWeight { get; set; }

        // a template set is a part of one exercise
        public virtual TemplateExercise TemplateExercise { get; set; }
    }
}
