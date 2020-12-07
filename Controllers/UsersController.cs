using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Project.Models;
using Microsoft.IdentityModel.Tokens;
using Project.Services;
using Project;

namespace ProjectC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        //import services and context
        private readonly ProjectCContext _context;
        private readonly IJwtAuthManager _jwtAuthManager;
        private readonly IUserService _userService;

        public UsersController(ProjectCContext context, IUserService userService, IJwtAuthManager jwtAuthManager) //controller constructor
        {
            //to use them in the controller
            _context = context;
            _jwtAuthManager = jwtAuthManager;
            _userService = userService;
        }

        // GET: api/Users
        [HttpGet]
        [Authorize] //use authorize tags to determine which actions need authorization
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync(); //return all users in a list
        }

        // GET: api/Users/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            //check if given id is equal to the id of the user to be edited
            if (id != user.Id)
            {
                return BadRequest();
            }
            //check if the updated username exists or not
            if (_userService.IsAnExistingUser(user.Username))
            {
                return BadRequest();
            }
            //update user
            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> PostUser(User user)
        {
            try
            {
                //check if model is valid
                if (ModelState.IsValid)
                {
                    //check if there is an user with the given username, if not then:
                    if (!_userService.IsAnExistingUser(user.Username))
                    {
                        _context.Add(user);
                        await _context.SaveChangesAsync();
                        return CreatedAtAction("GetUser", new { id = user.Id }, user);
                    }
                }
            }
            catch (DbUpdateException /* ex */)
            {
                //Log the error (uncomment ex variable name and write a log.
                ModelState.AddModelError("", "Unable to save changes. " +
                    "Try again, and if the problem persists " +
                    "see your system administrator.");
            }
            return BadRequest("Error while creating user!");
        }

        // DELETE: api/Users/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        //search for specific user
        [AllowAnonymous]
        [HttpGet("search")]
        public async Task<IActionResult> Index(string searchString)
        {
            //query to get all users
            var users = from u in _context.Users
                         select u;

            if (!String.IsNullOrEmpty(searchString))
            {
                users = users.Where(s => s.Username.Contains(searchString)); //query to search for user
            }

            return Ok(users);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public ActionResult Login([FromBody] LoginRequest request)
        {
            //check if login request is valid
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            //error if login credentials are invalid
            if (!_userService.IsValidUserCredentials(request.UserName, request.Password))
            {
                return Unauthorized();
            }

            var role = _userService.GetUserRole(request.UserName);

            //create new claim
            var claims = new[]
            {
                new Claim(ClaimTypes.Name,request.UserName),
                new Claim(ClaimTypes.Role, role)
            };

            //create token
            var jwtResult = _jwtAuthManager.GenerateTokens(request.UserName, claims, DateTime.Now);

            //return bearer token 
            return Ok(new LoginResult
            {
                UserName = request.UserName,
                Role = role,
                AccessToken = jwtResult.AccessToken,
                RefreshToken = jwtResult.RefreshToken.TokenString
            });
        }

        [HttpGet("user")]
        [Authorize]
        public ActionResult GetCurrentUser()
        {
            return Ok(new LoginResult
            {
                UserName = User.Identity.Name,
                Role = User.FindFirst(ClaimTypes.Role)?.Value ?? string.Empty,
                OriginalUserName = User.FindFirst("OriginalUserName")?.Value
            });
        }

        [HttpPost("logout")]
        [Authorize]
        public ActionResult Logout()
        {
            //remove token with username of the current logged in user
            var userName = User.Identity.Name;
            _jwtAuthManager.RemoveRefreshTokenByUserName(userName);
            return Ok();
        }

        [HttpPost("refresh-token")]
        [Authorize]
        public async Task<ActionResult> RefreshToken([FromBody] Project.Models.RefreshToken request)
        {
            try
            {
                var userName = User.Identity.Name;

                if (string.IsNullOrWhiteSpace(request.RToken))
                {
                    return Unauthorized();
                }

                //get new token
                var accessToken = await HttpContext.GetTokenAsync("Bearer", "access_token");

                //make new current user token with the now token added
                var jwtResult = _jwtAuthManager.Refresh(request.RToken, accessToken, DateTime.Now);

                //return new token
                return Ok(new LoginResult
                {
                    UserName = userName,
                    Role = User.FindFirst(ClaimTypes.Role)?.Value ?? string.Empty,
                    AccessToken = jwtResult.AccessToken,
                    RefreshToken = jwtResult.RefreshToken.TokenString
                });
            }
            catch (SecurityTokenException e)
            {
                return Unauthorized(e.Message); // return 401 so that the client side can redirect the user to login page
            }
        }
        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
