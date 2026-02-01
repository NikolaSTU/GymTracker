using AutoMapper;
using Common.Entities;
using Common.Persistance;
using Common.Services;
using GymTracker.Infrastructure.RequestDTOs.Users;
using GymTracker.Infrastructure.ResponseDTOs.Auth;

namespace GymTracker.Infrastructure.Services
{
    public class UserService : BaseService<User, UserRequest, UserResponse>
    {
        public UserService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
     
    }
}
