using GymTracker.Infrastructure.Services;
using AutoMapper;
using Common.Entities;
using Common.Persistance;
using GymTracker.Infrastructure.RequestDTOs.Auth;
using GymTracker.Infrastructure.RequestDTOs.Users;
using GymTracker.Infrastructure.ResponseDTOs.Auth;
using GymTracker.Infrastructure.Services.auth;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace GymTracker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly TokenService _tokenService;
        private readonly IMapper _mapper;

        public AuthController(AppDbContext db, TokenService tokenService, IMapper mapper)
        {
            _db = db;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] UserRequest request)
        {
            var existingUser = _db.Users.Any(u =>
                u.Email.ToLower() == request.Email.ToLower() ||
                u.Username.ToLower() == request.Username.ToLower());

            if (existingUser)
            {
                return BadRequest("A user with this username or email already exists.");
            }

            var user = _mapper.Map<User>(request);

            user.Password = BCrypt.Net.BCrypt.HashPassword(request.Password);

            _db.Users.Add(user);
            _db.SaveChanges(); 

            return Ok(new { message = "User registered successfully" });
        }

        [HttpPost("login")]
        public ActionResult<UserResponse> Login([FromBody] AuthTokenRequest request)
        {
            var user = _db.Users
                .FirstOrDefault(u => u.Username.ToLower() == request.Username.ToLower());

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                return Unauthorized("Invalid username or password.");
            }

            var response = _mapper.Map<UserResponse>(user);

            response.Token = _tokenService.CreateToken(user);

            return Ok(response);
        }
    }
}