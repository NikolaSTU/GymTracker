using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entities
{
    public class WorkoutTemplate : BaseEntity
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Desc { get; set; }

        // a template has one specific owner
        public virtual User User { get; set; }
        // a template has many exercises in it
        public virtual List<TemplateExercise> TemplateExercises { get; set; }
    }
}
