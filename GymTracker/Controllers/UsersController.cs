using Microsoft.AspNetCore.Mvc;
using GymTracker.Infrastructure.Services;
using GymTracker.Infrastructure.RequestDTOs.Users;
using GymTracker.Infrastructure.ResponseDTOs.Auth;
using Common.Entities;

namespace GymTracker.Controllers
{
    public class UsersController : BaseCrudController<User, UserService, UserRequest, UserResponse>
    {
        public UsersController(UserService service) : base(service)
        {
        }
    }
}
