using AutoMapper;
using Common.Entities;
using GymTracker.Infrastructure.ResponseDTOs.Auth;
using GymTracker.Infrastructure.ResponseDTOs.Exercises;
using GymTracker.Infrastructure.ResponseDTOs.Workouts;
using GymTracker.Infrastructure.ResponseDTOs.Templates;

namespace GymTracker.Infrastructure.Mappings
{
    public class ResponseMappingProfile : Profile
    {
        public ResponseMappingProfile()
        {
            // User -> UserResponse
            CreateMap<User, UserResponse>()
                .ForMember(d => d.Token, o => o.Ignore());

            // Exercise -> ExerciseResponse
            CreateMap<Exercise, ExerciseResponse>()
                .ForMember(d => d.Name, o => o.MapFrom(s => s.ExerciseName))
                .ForMember(d => d.Description, o => o.MapFrom(s => s.ExerciseDesc));

            // SetsEntry -> SetsEntryResponse
            CreateMap<SetsEntry, SetsEntryResponse>();

            // WorkoutExercise -> WorkoutExerciseResponse
            CreateMap<WorkoutExercise, WorkoutExerciseResponse>()
                .ForMember(d => d.ExerciseName, o => o.MapFrom(s => s.Exercise != null ? s.Exercise.ExerciseName : null))
                .ForMember(d => d.Sets, o => o.MapFrom(s => s.SetsEntries));

            // Workout -> WorkoutResponse
            CreateMap<Workout, WorkoutResponse>()
                .ForMember(d => d.Exercises, o => o.MapFrom(s => s.WorkoutExercises));

            // TemplateSet -> TemplateSetResponse
            CreateMap<TemplateSet, TemplateSetResponse>();

            // TemplateExercise -> TemplateExerciseResponse
            CreateMap<TemplateExercise, TemplateExerciseResponse>()
                .ForMember(d => d.ExerciseName, o => o.MapFrom(s => s.Exercise != null ? s.Exercise.ExerciseName : null))
                .ForMember(d => d.Sets, o => o.MapFrom(s => s.TemplateSets));

            // WorkoutTemplate -> WorkoutTemplateResponse
            CreateMap<WorkoutTemplate, WorkoutTemplateResponse>()
                .ForMember(d => d.Description, o => o.MapFrom(s => s.Desc))
                .ForMember(d => d.Exercises, o => o.MapFrom(s => s.TemplateExercises));
        }
    }
}
