using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entities
{
    public class Exercise : BaseEntity
    {
        public string ExerciseName { get; set; }
        public string ExerciseDesc { get; set; }

        // an exercise is a part of many templates and workouts
        public virtual List<TemplateExercise> TemplateExercises { get; set; }
        public virtual List<WorkoutExercise> WorkoutExercises { get; set; }
    }
}
