using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entities
{
    public class WorkoutExercise : BaseEntity
    {
        public int WorkoutId { get; set; }
        public int ExerciseId { get; set; }
        public int OrderIndex { get; set; }

        // a workout exercise is a part of one workout
        public virtual Workout Workout { get; set; }
        // a workout exercise is an exercise
        public virtual Exercise Exercise { get; set; }
        // a workout exercise has many set entries
        public virtual List<SetsEntry> SetsEntries { get; set; }
    }
}
