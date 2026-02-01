using System;
using System.Collections.Generic;

namespace Common.Entities;

public class User : BaseEntity
{
    public string Username { get; set; }

    public string Email { get; set; }
    public string Password { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int? Height { get; set; }
    public int? Weight { get; set; }
    public int? Gender { get; set; }
    public string Role { get; set; } = "User";

    //one user has many templates and many workouts
    public virtual List<WorkoutTemplate> WorkoutTemplates { get; set; }
    public virtual List<Workout> Workouts { get; set; }
}