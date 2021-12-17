using System.ComponentModel.DataAnnotations;

namespace MovieService.Models
{

    public class MovieRegisterDto
    {
        //Add or modify movie(s)
        [Required]
        [StringLength(255)]
        public string Title { get; set; }

        [StringLength(50)]
        public string Genre { get; set; }

        public int Year { get; set; }
    }
}
