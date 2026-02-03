using AutoMapper;
using Common.Entities;
using GymTracker.Infrastructure.RequestDTOs.Auth;
using GymTracker.Infrastructure.RequestDTOs.Exercises;
using GymTracker.Infrastructure.RequestDTOs.Templates;
using GymTracker.Infrastructure.RequestDTOs.Users;
using GymTracker.Infrastructure.RequestDTOs.Workouts;

namespace GymTracker.Infrastructure.Mappings
{
    public class RequestMappingProfile : Profile
    {
        public RequestMappingProfile()
        {
            CreateMap<UserRequest, User>();

            CreateMap<ExerciseRequest, Exercise>()
                 .ForMember(d => d.ExerciseName, o => o.MapFrom(s => s.ExerciseName))
                 .ForMember(d => d.ExerciseDesc, o => o.MapFrom(s => s.ExerciseDesc));

            CreateMap<WorkoutCreateRequest, Workout>()
                .ForMember(d => d.WorkoutExercises, o => o.MapFrom(s => s.Exercises));

            CreateMap<WorkoutExerciseRequest, WorkoutExercise>()
                .ForMember(d => d.SetsEntries, o => o.MapFrom(s => s.Sets))
                .ForMember(d => d.WorkoutId, o => o.Condition(s => s.WorkoutId > 0));

            CreateMap<SetsEntryRequest, SetsEntry>()
                .ForMember(d => d.WorkoutExerciseId, o => o.Condition(s => s.WorkoutExerciseId > 0)); // for put

            CreateMap<WorkoutTemplateCreateRequest, WorkoutTemplate>()
                 .ForMember(d => d.Desc, o => o.MapFrom(s => s.Description))
                 .ForMember(d => d.UserId, o => {
                     o.Condition(s => s.UserId > 0);
                     o.MapFrom(s => s.UserId);
                 })
                .ForMember(d => d.TemplateExercises, o => o.MapFrom(s => s.Exercises));

            CreateMap<TemplateExerciseRequest, TemplateExercise>()
                 .ForMember(d => d.TemplateSets, o => o.MapFrom(s => s.Sets))
                 .ForMember(d => d.TemplateId, o => o.MapFrom(s => s.WorkoutTemplateId))
                 .ForMember(d => d.TemplateId, o => o.Condition(s => s.WorkoutTemplateId > 0));

            CreateMap<TemplateSetRequest, TemplateSet>()
                .ForMember(d => d.TemplateExerciseId, o => o.Condition(s => s.TemplateExerciseId > 0));
        }
    }
}