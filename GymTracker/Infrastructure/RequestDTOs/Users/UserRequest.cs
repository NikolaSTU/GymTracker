namespace GymTracker.Infrastructure.RequestDTOs.Users
{
    public class UserRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }      
        public string FirstName { get; set; }
        public string LastName { get; set; }
       
        public int? Weight { get; set; }
        public int? Height { get; set; }
    }
}
