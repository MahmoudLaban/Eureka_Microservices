using System.ComponentModel.DataAnnotations;

namespace EurekaClient.Models
{
    public class DeleteUserDto
    {
        //Class used to delete user(s)

        [Required]
        public string Username { get; set; }

 
    }
}
