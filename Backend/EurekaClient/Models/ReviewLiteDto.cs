using System.ComponentModel.DataAnnotations;

namespace EurekaClient.Models
{

    public class ReviewLiteDto
    {
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
