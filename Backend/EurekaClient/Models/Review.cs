using System.ComponentModel.DataAnnotations;

namespace EurekaClient.Models
{
    public class Review
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public int movie_id { get; set; }

        [StringLength(512)]
        public string review_text { get; set; }

        public int rating { get; set; }

    }
}
