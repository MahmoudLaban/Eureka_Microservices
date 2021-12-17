using System.ComponentModel.DataAnnotations;

namespace EurekaClient.Models
{
    public class RegisterUserDto
    {
        //Class used to add or edit user(s)

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }
}
