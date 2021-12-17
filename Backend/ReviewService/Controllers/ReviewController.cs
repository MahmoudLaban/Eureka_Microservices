using ReviewService.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;

/*references:
-https://faun.pub/restful-web-api-using-c-net-core-3-1-with-sqlite-f020d76c9b89 
-https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-5.0&tabs=visual-studio
-https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-6.0
-https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/index/samples/3.x
-https://www.vitoshacademy.com/c-create-a-web-api-with-asp-net-core-video/
*/

namespace ReviewService.Controllers
{
    [ApiController] //From VS .Net template. The "ApiController" attribute applies web API behavior
    [Route("[controller]")]
    public class ReviewController : ControllerBase //Instantiating from Controllerbase (the base class for a MVC controller without view support)
    {
        #region Constructor
        //Inversion of Control container / Dependency Injection
        private readonly ApplicationDBContext _context;
        
        public ReviewController(ApplicationDBContext context)
        {
            _context = context; //instance of the "ApplicationDBContext" Class
        }

        #endregion

        //GET api/review/{movie_id}
        [HttpGet("{movie_id}")]
        public async Task<ActionResult<List<Review>>> GetMovieReviews(int movie_id)
        {
            return await _context.Reviews.Where(x => x.movie_id == movie_id).ToListAsync(); 
        }

        //POST api/review/
        [HttpPost]
        public async Task<ActionResult<Review>> AddMovieReview(ReviewLiteDto dto)
        {
            var newReview = new Review
            {
                user_id = dto.user_id,
                movie_id = dto.movie_id,
                review_text = dto.review_text,
                rating = dto.rating,
            };
            await _context.Reviews.AddAsync(newReview);
            await _context.SaveChangesAsync();
            return newReview;
        }

        //PUT api/review/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<Review>> UpdateMovieReview(int id, ReviewTextDto dto)
        {
            var reviewExist = await _context.Reviews.FindAsync(id);
            if(reviewExist == null)
            {
                return NotFound();
            }
            else
            {
                reviewExist.review_text = dto.review_text;
                reviewExist.rating = dto.rating;
                _context.Reviews.Update(reviewExist);
                await _context.SaveChangesAsync();
                return reviewExist;
            }
        }

        //DELETE api/review/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<Review>> DeleteMovieReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id); 
            if (review == null)
            {
                return NotFound();
            }
            else
            {
                _context.Reviews.Remove(review);
                await _context.SaveChangesAsync();
                return Ok();
            }
        }
    }
}
