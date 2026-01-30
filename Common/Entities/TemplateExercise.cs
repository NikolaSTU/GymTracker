using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entities
{
    public class TemplateExercise : BaseEntity
    {
        public int TemplateId { get; set; }
        public int ExerciseId { get; set; }
        public long OrderIndex { get; set; }

        // a template exercise is a part of one template
        public virtual WorkoutTemplate WorkoutTemplate { get; set; }
        // a template exercise is one exercise
        public virtual Exercise Exercise { get; set; }
        // a template exercise has many sets
        public virtual List<TemplateSet> TemplateSets { get; set; }
    }
}
