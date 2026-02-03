using Microsoft.AspNetCore.Mvc;
using GymTracker.Infrastructure.Services;
using GymTracker.Infrastructure.RequestDTOs.Users;
using GymTracker.Infrastructure.ResponseDTOs.Auth;
using Common.Entities;
using Microsoft.AspNetCore.Authorization;

namespace GymTracker.Controllers
{
    public class UsersController : BaseCrudController<User, UserService, UserRequest, UserResponse>
    {
        public UsersController(UserService service) : base(service)
        {
        }

        [Authorize (Roles = "Admin")]
        public override IActionResult Post([FromBody] UserRequest request)
        {
            return base.Post(request);
        }

        [Authorize (Roles = "Admin")]
        public override IActionResult Put(int id, [FromBody] UserRequest request)
        {
            return base.Put(id, request);
        }
        [Authorize (Roles = "Admin")]
        public override IActionResult Delete(int id)
        {
            return base.Delete(id);
        }

        [Authorize (Roles = "Admin")]
        public override IActionResult Get()
        {
            return base.Get();
        }

        [Authorize (Roles = "Admin")]
        public override IActionResult GetById(int id)
        {
            return base.GetById(id);
        }
    }
}
