using System.ComponentModel.DataAnnotations;

namespace ReviewService.Models
{

    public class ReviewLiteDto
    {
        //Add or modify review(s)
        [Required]
        public int user_id { get; set; }

        [Required]
        public int movie_id { get; set; }

        [StringLength(250)]
        public string review_text { get; set; }

        public int rating { get; set; }
    }

    public class ReviewTextDto
    {
        public string review_text { get; set; }
        public int rating { get; set; }
    }
}
