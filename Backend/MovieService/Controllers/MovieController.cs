using MovieService.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

/*references:
-https://faun.pub/restful-web-api-using-c-net-core-3-1-with-sqlite-f020d76c9b89 
-https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-5.0&tabs=visual-studio
-https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-6.0
-https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/index/samples/3.x
-https://www.vitoshacademy.com/c-create-a-web-api-with-asp-net-core-video/
*/

namespace MovieService.Controllers
{
    [ApiController] //From VS .Net template. The "ApiController" attribute applies web API behavior
    [Route("[controller]")]
    public class MovieController : ControllerBase //Instantiating from Controllerbase (the base class for a MVC controller without view support)
    {

        #region Constructor
        //Inversion of Control container / Dependency Injection
        private readonly ApplicationDBContext _context;
        public MovieController(ApplicationDBContext context)
        {
            _context = context; //instance of the "ApplicationDBContext" Class
            
        }

        #endregion

        //GET api/movie/
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movie>>> GetAllMovies()
        {
            return await _context.Movies.ToListAsync();
        }

        //GET api/movie/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Movie>> GetMovie(int id)
        {
            var movie = await _context.Movies.FindAsync(id); 
            if (movie == null)
            {
                return NotFound();
            }
            return movie;
        }

        //POST api/movie/
        [HttpPost]
        public async Task<ActionResult<Movie>> AddMovie(MovieRegisterDto movie)
        {
            var newMovie = new Movie
            {
                Title = movie.Title,
                Genre = movie.Genre,
                Year = movie.Year
            };
            await _context.AddAsync(newMovie);
            await _context.SaveChangesAsync();
            return newMovie;
        }

        //PUT api/movie/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<Movie>> CreateOrUpdateMovie(int id, MovieRegisterDto movie)
        {
            var movieExist = await _context.Movies.FindAsync(id); 
            if(movieExist == null)
            {
                movieExist = new Movie
                {
                    Title = movie.Title,
                    Genre = movie.Genre,
                    Year = movie.Year
                };
                await _context.AddAsync(movieExist);
            }
            else
            {
                movieExist.Title = movie.Title;
                movieExist.Genre = movie.Genre;
                movieExist.Year = movie.Year;
                _context.Movies.Update(movieExist);
            }
            await _context.SaveChangesAsync();
            return movieExist;
        }

        //DELETE api/movie/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<Movie>> DeleteMovie(int id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null)
            {
                return NotFound();
            }
            else
            {
                _context.Movies.Remove(movie);
                await _context.SaveChangesAsync();
                return Ok();
            }
        }
    }
}
