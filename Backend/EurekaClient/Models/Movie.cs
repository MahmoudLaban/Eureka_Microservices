using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EurekaClient.Models
{
    //The Movie Class used for retrieving movie(s)
    public class Movie
    {
        public int id { get; set; }

        public string Title { get; set; }

        public string Genre { get; set; }

        public int Year { get; set; }

    }
}
