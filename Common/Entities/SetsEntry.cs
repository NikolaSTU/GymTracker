using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entities
{
    public class SetsEntry : BaseEntity
    {
        public int WorkoutExerciseId { get; set; }
        public int Reps { get; set; }
        public float Weight { get; set; }
        public int Rir { get; set; } 
        public string Notes { get; set; }

        // a set entry is a part of one workout exercise
        public virtual WorkoutExercise WorkoutExercise { get; set; }
    }
}
