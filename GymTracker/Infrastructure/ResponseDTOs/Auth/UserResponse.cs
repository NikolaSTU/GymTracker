using System;

namespace GymTracker.Infrastructure.ResponseDTOs.Auth
{
    public class UserResponse 
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? Weight { get; set; }
        public int? Height { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }
    }
}
