using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entities
{
    public class Workout : BaseEntity
    {
        public string Name { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }

        // a workout is of one user
        public virtual User User { get; set; }
        // a workout has many exercises
        public virtual List<WorkoutExercise> WorkoutExercises { get; set; }
    }
}
