using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MovieService.Models
{
    //The Movie Class used for retrieving movie(s)
    [Table("collection")]
    public class Movie
    {
        //For retrieving movies
        public int id { get; set; }

        [StringLength(255)]
        public string Title { get; set; }

        [StringLength(50)]
        public string Genre { get; set; }

        public int Year { get; set; }

    }
}
