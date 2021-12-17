using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReviewService.Models
{
    [Table("reviews")]
    public class Review
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public int movie_id { get; set; }

        [StringLength(512)]
        public string review_text { get; set; }

        //Rating feature
        public int rating { get; set; }

    }
}
