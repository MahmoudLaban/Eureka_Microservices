using AuthService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

/*references:
-https://faun.pub/restful-web-api-using-c-net-core-3-1-with-sqlite-f020d76c9b89 
-https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-5.0&tabs=visual-studio
-https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-6.0
-https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/web-api/index/samples/3.x
-https://www.vitoshacademy.com/c-create-a-web-api-with-asp-net-core-video/
*/

namespace AuthService.Controllers
{
    [ApiController] //From VS .Net template. The "ApiController" attribute applies web API behavior
    [Route("[controller]")]
    public class AuthController : ControllerBase //Instantiating from Controllerbase (the base class for a MVC controller without view support)
    {

        #region Constructor
        //Inversion of Control container / Dependency Injection
        private readonly ApplicationDBContext _context;
        private readonly AppSettings _appSettings;
        public AuthController(ApplicationDBContext context, IOptions<AppSettings> appSettings)
        {
            _context = context; //instance of the "ApplicationDBContext" Class
            _appSettings = appSettings.Value;
        }

        #endregion

        //POST api/Auth/"auth-user"
        [HttpPost("auth-user")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var user = _context.Users.Where(x => x.username == model.Username && x.password == model.Password).FirstOrDefault();

            if (user == null)
                return BadRequest(new { message = "Either the user name or password is incorrect" });
            
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var authResponse = new AuthenticateResponse(user, tokenHandler.WriteToken(token));
            return Ok(authResponse);
        }

        //POST api/Auth/
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(RegisterUserDto model)
        {
            var success = false;
            var user = _context.Users.Where(x => x.username == model.Username).FirstOrDefault();
            if(user == null)
            {
                var newUser = new User
                {
                    username = model.Username,
                    password = model.Password,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Email = model.Email
                };
                await _context.Users.AddAsync(newUser);
                await _context.SaveChangesAsync();
                success = true;
            }
            return Ok(new { success = success });
        }

        //GET api/Auth/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserDetail(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }


        //GET api/Auth/ 
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }

        //DELETE api/auth/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            else
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
                return Ok();
            }
        }



    }
}
