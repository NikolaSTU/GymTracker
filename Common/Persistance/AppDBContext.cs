using Common.Entities;
using Microsoft.EntityFrameworkCore;

namespace Common.Persistance;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Exercise> Exercises { get; set; }
    public DbSet<WorkoutTemplate> WorkoutTemplates { get; set; }
    public DbSet<TemplateExercise> TemplateExercises { get; set; }
    public DbSet<TemplateSet> TemplateSets { get; set; }
    public DbSet<Workout> Workouts { get; set; }
    public DbSet<WorkoutExercise> WorkoutExercises { get; set; }
    public DbSet<SetsEntry> SetsEntries { get; set; }

    override protected void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder
            .UseLazyLoadingProxies()
            .UseSqlServer(@"Data Source=(localdb)\MSSQLLocalDB;
                            Initial Catalog=GymTrackerDB;
                            Integrated Security=True;
                            Persist Security Info=False;
                            Pooling=False;
                            MultipleActiveResultSets=True;
                            Encrypt=True;
                            TrustServerCertificate=True;");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //explicit primary keys
        modelBuilder.Entity<User>().HasKey(u => u.Id);
        modelBuilder.Entity<Exercise>().HasKey(e => e.Id);
        modelBuilder.Entity<WorkoutTemplate>().HasKey(wt => wt.Id);
        modelBuilder.Entity<TemplateExercise>().HasKey(te => te.Id);
        modelBuilder.Entity<TemplateSet>().HasKey(ts => ts.Id);
        modelBuilder.Entity<Workout>().HasKey(w => w.Id);
        modelBuilder.Entity<WorkoutExercise>().HasKey(we => we.Id);
        modelBuilder.Entity<SetsEntry>().HasKey(se => se.Id);

        // User -> Workout
        modelBuilder.Entity<Workout>()
            .HasOne(w => w.User)
            .WithMany(u => u.Workouts)
            .HasForeignKey(w => w.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        // Workout -> WorkoutExercise
        modelBuilder.Entity<WorkoutExercise>()
            .HasOne(we => we.Workout)
            .WithMany(w => w.WorkoutExercises)
            .HasForeignKey(we => we.WorkoutId)
            .OnDelete(DeleteBehavior.Cascade);

        // WorkoutExercise -> SetsEntry
        modelBuilder.Entity<SetsEntry>()
            .HasOne(se => se.WorkoutExercise)
            .WithMany(we => we.SetsEntries)
            .HasForeignKey(se => se.WorkoutExerciseId)
            .OnDelete(DeleteBehavior.Cascade);

        // User -> WorkoutTemplate
        modelBuilder.Entity<WorkoutTemplate>()
            .HasOne(wt => wt.User)
            .WithMany(u => u.WorkoutTemplates)
            .HasForeignKey(wt => wt.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        // WorkoutTemplate -> TemplateExercise
        modelBuilder.Entity<TemplateExercise>()
            .HasOne(te => te.WorkoutTemplate)
            .WithMany(wt => wt.TemplateExercises)
            .HasForeignKey(te => te.TemplateId)
            .OnDelete(DeleteBehavior.Cascade);

        // TemplateExercise -> TemplateSet
        modelBuilder.Entity<TemplateSet>()
            .HasOne(ts => ts.TemplateExercise)
            .WithMany(te => te.TemplateSets)
            .HasForeignKey(ts => ts.TemplateExerciseId)
            .OnDelete(DeleteBehavior.Cascade);

        // TemplateExercise -> Exercise
        modelBuilder.Entity<TemplateExercise>()
             .HasOne(te => te.Exercise)
            .WithMany(e => e.TemplateExercises)
            .HasForeignKey(te => te.ExerciseId)
            .OnDelete(DeleteBehavior.Restrict);

        // WorkoutExercise -> Exercise
        modelBuilder.Entity<WorkoutExercise>()
            .HasOne(we => we.Exercise)
            .WithMany(e => e.WorkoutExercises)
            .HasForeignKey(we => we.ExerciseId)
            .OnDelete(DeleteBehavior.Restrict);


        modelBuilder.Entity<User>().HasData(new User
        {
            Id = 1,
            Username = "nikola",
            Password = "password",
            Email = "nikola@gymtracker.com", 
            FirstName = "Nikola",
            LastName = "Dev",
            Height = 185,    
            Weight = 90,     
            Gender = 1,    
            Role = "Admin",
           
        });

        modelBuilder.Entity<Exercise>().HasData(new Exercise
        {
            Id = 1,
            ExerciseName = "Squat",
            ExerciseDesc = "Leg compound movement"
        });
    }
}